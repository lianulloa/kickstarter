import React, {useState} from "react"
import { Form, Button, Input, Message } from "semantic-ui-react"
import Layout from "../../components/Layout"
import campaignFactory from "../../ethereum/factory"
import web3 from "../../ethereum/web3"
import { Router } from '../../routes'

function CampaignNew() {
  const [minimumContrib, setMinimumContrib] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setErrorMsg("")
      const accounts = await web3.eth.getAccounts()
      await campaignFactory.methods.createCampaign(minimumContrib)
        .send({
          from: accounts[0]
        })
      
      Router.pushRoute('/')
    } catch (error) {
      setErrorMsg(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Layout>
      <h3>Create a campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMsg}>
        <Form.Field>
          <label >Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContrib}
            onChange={event => setMinimumContrib(event.target.value)}
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMsg} />
        <Button primary loading={loading}>Create!</Button>
      </Form>
    </Layout>
  )
}

export default CampaignNew