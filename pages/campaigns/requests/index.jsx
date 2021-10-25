import React from "react"
import { Button, Table } from 'semantic-ui-react'
import {Link} from '../../../routes'
import Layout from '../../../components/Layout'
import {getCampaign} from '../../../ethereum/campaign'
import RequestRow from "../../../components/RequestRow"

function RequestIndex(props) {
  const {Header, Row, HeaderCell, Body} = Table

  return (
    <Layout>
      <h3>Requests</h3>
      <Link route={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Desc</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {
            props.requests.map(
              (r, i) =>
                <RequestRow
                  key={i}
                  id={i}
                  {...r}
                  approversCount={props.approversCount}
                />
            )
          }
        </Body>
      </Table>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const {address} = context.query
  const campaign = getCampaign(address)
  const requestCount = parseInt(await campaign.methods.getRequestCount().call())
  const approversCount = await campaign.methods.approversCount().call()

  const requests = (await Promise.all(
    Array(requestCount).fill()
      .map((el, i) => {
        return campaign.methods.requests(i).call()
      })
  )).map(({description, value,recipient, complete, approvalCount}) => ({
    description, value,recipient, complete, approvalCount
  }))

  return {
    props: {
      address,
      requests,
      requestCount,
      approversCount
    }
  }
}

export default RequestIndex