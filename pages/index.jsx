import React, {useEffect} from 'react'
import campaignFactory from "../ethereum/factory"

function CampaignIndex({ campaigns }) {
  useEffect(async () => {
    console.log(campaigns)
  }, [])
  return <h1>list page</h1>
}

export async function getServerSideProps(context) {
  const campaigns = await campaignFactory.methods.getDeployedCampaigns().call()

  return {
    props: {campaigns}
  }
}

export default CampaignIndex