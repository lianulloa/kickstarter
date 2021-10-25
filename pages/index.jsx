import React, {useEffect} from 'react'
import { Card, Button } from 'semantic-ui-react'
import campaignFactory from "../ethereum/factory"
import Layout from '../components/Layout'
import {Link} from '../routes'


function CampaignCard({campaigns}) {
  const items = campaigns.map(address => ({
    header: address,
    description: (
      <Link route={`/campaigns/${address}`}>
        <a>
          View campaign
        </a>
      </Link>
    ),
    fluid: true
  }))
  return <Card.Group items={items }/>
}

function CampaignIndex({ campaigns }) {
  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              content="Create campaign"
              floated="right"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        <CampaignCard campaigns={campaigns} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const campaigns = await campaignFactory.methods.getDeployedCampaigns().call()

  return {
    props: {campaigns}
  }
}

export default CampaignIndex