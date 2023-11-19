# Default Skeleton App for create-coinweb-dapp

Welcome to the default skeleton app for create-coinweb-dapp! This project
serves as a starting point for building your own decentralized applications
using Coinweb's technology.


## Building and deploying:

Build the Javascript based smart contract example using `yarn build`.  This
command will build, package, and deploy the required `actions` to get the smart
contract registered and available on-chain:

```
$ yarn build
...
Transaction ID:  f116fc3046c43c2223e4d6d1fd0566db9b97b5bd909f4a05362f79ca5e2ba341
Transaction URL: https://explorer-devnet.coinweb.io/?hash=f116fc3046c43c2223e4d6d1fd0566db9b97b5bd909f4a05362f79ca5e2ba341
...
```

Transactions that need to be executed are shown in the output, but since smart
contracts that have already been deployed need not be deployed again, there is
usually nothing that needs to be done wrt deploying and registering the smart
contracts.

However, if you change anything in the smart contract examples, new transactions
for the updated smart contracts will have to be broadcasted.

## Example contract modules

### Hello World

```
./packages/hello-world.cm
```

This contract module contains a smart contract that simply writes a claim including
the string "hello world".  The offchain "app" contains code to test that the
hello world claim was written correctly.


### Token Creator

```
./packages/token-creator.cm
```

This contract module contains a smart contract that creates a token (from parameters),
and after successful creation, calls back into itself.


## Call hello world smart contract example

You can invoke your smart contracts by running `yarn workspace hello-world.cm
call-contract`. This will create a claim that contains "hello world" in devnet.


The `yarn workspace hello-world.cm call-contract` command will create a
transaction that calls the smart contract.  This is done by creating a
`call.yaml` file based on the `call.yaml.template` (replacing the contract id).
Then it calls `cweb-tool call ...` which creates a transaction that invokes the
smart contract with the arguments specified in `call.yaml` (currently no
arguments are specified there).


```
$ yarn workspace hello-world.cm call-contract

...
Transaction ID:  f116fc3046c43c2223e4d6d1fd0566db9b97b5bd909f4a05362f79ca5e2ba341
Transaction URL: https://explorer-devnet.coinweb.io/?hash=f116fc3046c43c2223e4d6d1fd0566db9b97b5bd909f4a05362f79ca5e2ba341
...
```

## Check the result


The smart contract example writes a "hello world" claim (key: [1, 4], value:
"hello world", fees: 0) that we can read using the normal npm package that uses
the `@coinweb/wallet-lib` to read this claim from the devnet.


```
$ yarn workspace hello-world.cm start
```


## Scripts

Here are the commands you can run, as defined in the `package.json` file:

- `yarn build`: Runs the build command, packs the project, creates an index, and publishes actions.
- `yarn pack:cweb`: Packs the project using the cweb-tool.
- `yarn pack:yarn`: Packs the project using yarn.
- `yarn create-index`: Creates an index using the cweb-tool.
- `yarn gather-actions`: Gathers actions using the cweb-tool.
- `yarn filter-actions`: Filters actions using the cweb-tool.
- `yarn execute-actions`: Executes actions using the cweb-tool.
- `yarn publish-actions`: Publishes actions using the cweb-tool.
- `yarn call-contract`: Calls all contracts in all workspaces using the cweb-tool.
- `yarn clean`: Cleans the project.

Running `yarn build` will execute most of these commands and publish your smart contract.

The project in `offchain/*` contains a small program that will read the claim written by the smart contract. Enjoy building your dApp!
