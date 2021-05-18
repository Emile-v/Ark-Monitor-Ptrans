# Ark-monitor

Ark-monitor is a CLI offering a wide range of indicators to monitor the ARK blockchain. 


## Prerequisites

Node.js and npm are required


## Installation

#### With Github: ​
1. Git Clone the repository

```bash
git clone https://github.com/Emile-v/Ark-Monitor-Ptrans.git
```
2. Enter the repository

```bash
​cd Ark-Monitor-Ptrans
```

3. Install it globally

```bash
npm install -g
```

#### With npm:

(With your Node terminal)

Just install globally the ark-monitor package
```bash
npm install -g ark-monitor
```

#### Notes
* On Linux you might need to use sudo to use the -g option.
* To use the shortcut script 'monitor' on Windows, make sure script execution is enabled: In PowerShell (as Administrator): > set-executionpolicy unrestricted
* Installing with the -g option is necessary to be able to use the shortcut 'monitor' and also allows to use from any directory. If you don't install it globally, you can instead use 'node ./bin/index.js instead from the cloned repo directory.



## Usage
In your terminal:

```bash
monitor help
```
to see all the available commands.

In general:
```bash
monitor commandName argument1 argument2 -option optionArgument
```


# Notes for usage
### A quick summary of the various indicators: 


In this section we are going to go over the indicators, grouped by their type:
* Global Indicators
These indicators return data regarding the whole blockchain. They mostly count data that gives an idea about the state of the blockchain.
Example : numberOfNodesByBlockId
Parameters :none
Alias: nonbbi

* Node Indicators
        These indicators grant information about specific nodes such as their physical location or their status in the blockchain.
Example: country

    
* Local Indicators
The particularity of these indicators is that they get data from the machine the monitor is run from. Be wary that some of them require to have an ark relay node installed(getNodeEnvList) or running(getNodeProcessStatus).

* Basic Indicators
        These simple indicators give a direct way of interacting with the ark API. They are structured exactly like the Endpoints of the API(Node,Wallet,Votes…). This way,
 you can use the tools provided by the monitor on top of the official API.


### CLI:
How to use:
The command line interface of this monitor is fairly simple. 
Firstly if you installed the monitor globally (```npm install -g``` ), you may use the shorthand ```monitor```  followed by the alias of the command. 
To display all indicators, use the command monitor help.

Most commands allow you to specify parameters, like the maximum number of pages displayed or the limit of elements fetched. 
To use these, simply add them at the end of the prompt. Example:``` monitor feest 1 5```

Some commands expect you to specify the mandatory first parameter. These are usually commands that fetch data based on the parameter like get_block_by_id.



### Interactive CLI

The monitor comes with an interactive command. Use ``` monitor interact ```(alias ``` monitor ic```) to access it and let it guide you. This command does not include indicators that require more than one parameter. The interactive command also allows retrieval of a group of selected non-parametric indicators.

### Refresh the list of nodes
A lot of commands use a list of nodes stored locally by the monitor app. Make sure to refresh it from time to time and when launching the monitor by using the command monitor refresh_list (alias monitor rfs).    

### Display the network map
It is possible to display the ‘map’ of the network by using the command ``` monitor network_graph ``` (alias```  monitor graph ``` ). It will open a web page with a graph of the network. This graph is based on a file stored by the monitor app, to refresh this file, you can use one of the three following commands : 
``` map_All_Network|man<Ip_roots> ```
```map_With_Iteration|mwi [options] <Ip_roots> [nb_Iteration]```
``` map_With_Iteration_Max_Peer|mwimp [options] <Ip_roots> [nb_Iteration] [nb_maxPeers]  ``` 

### Export indicator results
Every command prints the indicator result in the terminal but also offers the possibility to export the result in a file. In order to do so, you have to add an export option. There are 3 export options to export: --exportJSON (alias -exJSON), --exportYAML (alias -exYML) and --exportXML (alias -exXML), respectively to export the data in json, yaml and xml. 
To use it, add the option at the end of your command and specify the name of the file to export. 
Example: ``` monitor man 5.135.22.93 -exportYAML nameOfTheFile ```  
The data will be exported to the directory from which the command is exported (it is possible to specify another directory in the name of the file).


# Notes for developpers

### General architecture of the application : 
* Every indicator/command relies on a function that returns the wanted data. 
* Each command is created in the file index.js by creating an Indicator object and calling the CLI method on it. 
* To instantiate an Indicator object you need to pass as arguments the following elements : the name of the indicator, the corresponding function, the required and optional parameters, the alias, the description and the category (taken from categoriesEnum). 
* Once instantiated, you can call the CLI method on the object so it can create the method with the Commander.js syntax (Commander.js is the library used for  creating the Command Line Interface).
* Example :

```javascript
let numberOfTransaction = new Indicator(
    "number_Of_Transaction",
    number_Of_Transaction,
    [["hours"],["typeOfTransaction"]],
    "not",
    "Retrieves the number of transaction based on given number of hours",
    categoriesEnum.TRANSACTIONS
    )
numberOfTransaction.CLI()

```

Thus, if you want to add a new command all you need to do is create the function corresponding to the wanted indicator and instantiate with it a new Indicator object in the index.js file.

### The interactive command :
The interactive command is created in the file interactiveCommand.js with the help of the Inquierer.js library. 
This command allows us to retrieve most of the indicators of the monitor (the ones with one parameter or less). 
There is nothing to do to add a new indicator to this interactive command : the indicators are automatically added to the list offered by the interactive command when a new Indicator object is instantiated.

### The indicator class

As said before, every indicator and every command is created by instantiating an Indicator object. Here is a description of this class :

The Indicator class gathers all the information necessary to create the command associated with each indicator and generates the code with Commander.js syntax that adds the command and its behavior to the CLI.

The Indicator class has the following attributes :


| Attributes | Description | Type |
| ---------- | ----------- |----- |
| name | The name of the indicator | String|
| alias | The alias of the command | String|
| description | A little description of the indicator which is displayed by the help command | String|
| format | A Json Object which defines the format of the indicator’s output  | Json Object|
| parameter | An array which contains the list of mandatory and optional parameters of the indicator’s command | Array|
| indicator_function | A reference to the fonction which allows to generate the result of the indicator | function_reference|
| category | The category (from categoriesEnum) of the indicator, used for the interactive command. | Enum|

##### Method : 
`CLI()` : this method allows to generate the command of an indicator 


### Refresh functions 
`refreshData()` in the file utils>refresh.js : This function updates the file listOfNodes.json which contains the list of all nodes of the network. Indeed, it is necessary to refresh that file from time to time because the network can evolve and a lot of functions of our project use that file to generate indicators.  

`refresh_Data_Vis(data)` in the file Mapping.js : this function updates the file visualization.json in the repository sigma/data. Indeed, visualization.json normally contains a graph which will be displayed thanks to the library Sigma.


### The network mapping
The monitor allows to map the blockchain network in a graph that can be retrieved as a file or displayed in a web page. Here is a description of the content of the file Mapping.js that allows the mapping :


#### The Graph class : 
A class which allows to create a graph of the network for the visualization through the sigma library.


| Attributes | Description | Type |
| ---------- | ----------- |----- |
| nodes | The name of the indicator | String|
| edges | contains the list of all dependances between all nodes | Edge|

###### Methods :
```find_Node_By_IP(String ip)``` :  returns the Node of the graph which matches with the ip passed in the parameter.

``` graphInit_1(String ip_racine, int iteration)```  : first way to initialize the graph. This method builds the graph by using ip_racine as the first node and a number of iterations on a node.

``` graphInit_2(String ip_racine, int iteration, int nbMaxPeer) ``` : second way to initialize the graph. This method builds the graph by using ip_racine as the first node, a number of iterations on a node and a limitation on the number of the peers of a node.

``` graphInit_All_Network() ``` : third way to initialize the graph. This method builds the graph by using all nodes on the network. By the way, this method refreshes listOfAllNode.json as well.

 
#### The node class: 

 
 A class which create a node which will used in the class Graph, with the Sigma implementation in mind.



| Attributes | Description | Type |
| ---------- | ----------- |----- |
| id | the node ID (mandatory) | String|
| label | contains the IP of the node on the network | String|
| x,y | Abscissa/Orderly of the node on the graph | Edge|

##### Note: 
The position of the nodes get changed on the web-side (Forced Layout algorithm)

##### method:
`equals(Node node)` : define if the current node is equal to the node passed on parameter


#### The edge class:
A class which creates an edge which will used in the class Graph.


| Attributes | Description | Type |
| ---------- | ----------- |----- |
| id | the edge ID (mandatory) | String|
| source | contains the id of the source node | String|
| target | contains the id of the target node | String|

##### method :
`equals(Edge edge)` : defines if the current edge is equal to the edge passed as a parameter



### Graph visualization and Sigma:
The code for the visualization is in 2 parts.

* The Sigma folder:
 Handles the web-side of the visualization (js, html).
    To display the graph, we use the data viz library Sigma.js. 
The Json data of the mapping is in the data folder. It has a specific structure and is built by an instance of the Graph class.
``` index.html ``` is the simple webpage that pieces it together.We use the Forced Layout algorithm of Sigma to have a clearer representation of the network.

* The local server:
To access the webpage ``` index.html ```, ``` >monitor graph``` uses the  ‘LaunchGraph’ function (utils/NetGraph.js) to launch a local server to display the network via the web page. 
It uses the library live-server.



## Credit
includes IP2Location LITE data available from <http://www.ip2location.com>


## License
[MIT](https://choosealicense.com/licenses/mit/)
