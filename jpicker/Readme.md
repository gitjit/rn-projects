# JPicker

## To Run

```
$ yarn install
$  npx react-native autolink-windows

```
Then do an autolinking.

`$ npx react-native autolink-windows
`
* Open the folder in VS Code.  
* Open the Windows/.sln file in VS2019 and switch to X64 and build
* In VSCode do `$ yarn start` (Root folder) 
* Run the UWP app in Visual Studio.



## Setup  

```bash
$ npx react-native init jpicker --template react-native@^0.70.0
$ cd jpicker
$ npx react-native-windows-init --version 0.70.0 --language "cs" --overwrite


```
Edit ExpirementalFeatures.props file in Windows folder and make it true.

`<UseExperimentalNuget>true</UseExperimentalNuget>
`

## Add a Native Module
