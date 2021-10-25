import React, {useState} from "react"
import {Form, Button, Message, Input} from 'semantic-ui-react'
import { getCampaign } from "../ethereum/campaign"
import web3 from "../ethereum/web3"
import {Router} from "../routes"

function ContributeForm({ address }) {
  const [value, setValue] = useState('')

  const onSubmit = async e => {
    e.preventDefault()

    const campaign = getCampaign(address)
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      })

      Router.replaceRoute(`/campaigns/${address}`)
    } catch (error) {
      console.log(error)
    } finally {
      console.log("done!")
    }
  }
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label >Amount to contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </Form.Field>
      <Button primary>Contribute</Button>
    </Form>
  )
}

export default ContributeForm