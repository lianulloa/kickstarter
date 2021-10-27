import React from "react"
import { Card, Grid, Button } from "semantic-ui-react"
import Layout from "../../components/Layout"
import { getCampaign } from "../../ethereum/campaign"
import web3 from "../../ethereum/web3"
import ContributeForm from "../../components/ContributeForm"
import {Link} from "../../routes"

function CampaignShow(props) {
  const items = [
    {
      header: props.manager,
      meta: 'Address of Manager',
      description: 'The manager created this campaign and can create requests to withdraw money',
      style: {overflowWrap: 'break-word'}
    },
    {
      header: props.minimumContribution,
      meta: 'Minimum Contribution (wei)',
      description: 'you must contribute at least this muchh wei',
    },
    {
      header: props.requestsCount,
      meta: 'Number of Requests',
      description: 'A request tries to withdraw money',
    },
    {
      header: props.approversCount,
      meta: 'Number of approvers',
      description: 'people that has already contributed',
    },
    {
      header: web3.utils.fromWei(props.balance, 'ether'),
      meta: 'Campaign Balance',
      description: 'The balance available to spent',
    },

  ]

  return (
    <Layout>
      <h3>Campaign Details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={4}>
            <ContributeForm address={props.address}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${props.address}/requests`}>
              <a>
                <Button primary>
                  View requests
                </Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const campaign = getCampaign(context.query.address)
  const summary = await campaign.methods.getSummary().call()
  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      address: context.query.address
    }
  }
}

export default CampaignShow