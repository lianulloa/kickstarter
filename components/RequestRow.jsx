import React from "react"
import { Table } from "semantic-ui-react"
import web3 from "../ethereum/web3"

function RequestRow({
  id, description, value, recipient, approvalCount,approversCount }) {
  const { Row, Cell } = Table
  return (
    <Row>
      <Cell>{id}</Cell>
      <Cell>{description }</Cell>
      <Cell>{web3.utils.fromWei(value, 'ether') }</Cell>
      <Cell>{recipient }</Cell>
      <Cell>{approvalCount}/{approversCount }</Cell>
      <Cell></Cell>
      <Cell></Cell>
    </Row>
  )
}

export default RequestRow