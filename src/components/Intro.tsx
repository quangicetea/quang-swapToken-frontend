import * as React from "react";

export function Intro() {
  return (
    <div className="my-5">
      <h1 className="text-3xl font-bold">Project Description</h1>
      <br />
      <p>In this project, there are two roles involved: user and admin.</p>
      <br />
      <h2 className="text-xl font-bold">User</h2>
      <p>Users can perform token swaps.</p>
      <br />
      <h2 className="text-xl font-bold">Admin</h2>
      <p>
        The admin role holds the authority to set the exchange rate. Admin also deploy ToknSwap.
      </p>
      <br />
      <h2 className="text-xl font-bold">Process Flow</h2>
      <p>The main flow of the process is as follows:</p>
      <ol>
        <li>User 1 holds 5000000000000000000 tokens of ABC Coin, an ERC20 token.</li>
        <li>User 2 holds 5000000000000000000 tokens of XYZ Coin, another ERC20 token.</li>
        <li>
          Both User 1 and User 2 want to exchange a certain amount of ABC for XYZ, with the exchange
          rate determined by the admin.
        </li>
        <li>The admin deploys the TokenSwap contract.</li>
        <li>The admin initialize the TokenSwap contract.</li>
        <li>The admin can change the exchange rate, coin, sender, receiver if needed.</li>
        <li>User 1 approves TokenSwap to withdraw 10000 tokens from their ABC Coin balance.</li>
        <li>User 2 approves TokenSwap to withdraw 10000 tokens from their XYZ Coin balance.</li>
        <li>Either User 1 or User 2 invokes the TokenSwap.swap() function.</li>
        <li>As a result, the tokens are successfully traded between User A and User B.</li>
      </ol>
    </div>
  );
}
