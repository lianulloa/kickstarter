import React, {useState} from "react"
import {Form, Button, Message, Input} from 'semantic-ui-react'
import { getCampaign } from "../../../ethereum/campaign"
import web3 from "../../../ethereum/web3"
import { Router } from "../../../routes"
import Layout from "../../../components/Layout"


function RequestNew(props) {
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const [recipient, setRecipient] = useState('')

  const onSubmit = async e => {
    e.preventDefault()

    const campaign = getCampaign(props.address)
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({
        from: accounts[0]
      })
    } catch (error) {
      console.error(error)
    } finally {
      console.log("done")
    }
  }
  return (
    <Layout>
      <h3>Create a request</h3>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label >Description</label>
          <Input
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label >Value in ether</label>
          <Input
            label="ether"
            labelPosition="right"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label >Recipient</label>
          <Input
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Button primary>Create</Button>
      </Form>
    </Layout>

  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      address: context.query.address
    }
  }
}


export default RequestNew