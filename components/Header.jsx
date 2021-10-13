import React from "react"
import {Menu} from 'semantic-ui-react'

function Header() {
  return (
    <Menu style={{marginTop: 10}}>
      <Menu.Item>
        Crowcoin
      </Menu.Item>
      
      <Menu.Menu position="right">
        <Menu.Item>
          Campaigns
        </Menu.Item>
        <Menu.Item>
          +
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Header