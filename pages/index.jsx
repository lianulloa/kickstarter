import React, {useEffect} from 'react'
import { Card, Button } from 'semantic-ui-react'
import campaignFactory from "../ethereum/factory"
import Layout from '../components/Layout'

function CampaignCard({campaigns}) {
  const items = campaigns.map(address => ({
    header: address,
    description: 'View campaign',
    fluid: true
  }))
  return <Card.Group items={items }/>
}

function CampaignIndex({ campaigns }) {
  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Button
          content="Create campaign"
          floated="right"
          icon="add circle"
          primary
        />
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