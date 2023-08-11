import React from 'react';
import './App.css';
import Textarea from "./components/TextareaInput";
import makeTree,* as Tree from "./helpers/tree";
import Typer from "./components/Typer";
import "./styles/shadow.css";
import * as constants from "./helpers/constants";

class  App extends React.Component{
    constructor(){
      super();
      this.state={
        output:<div></div>,
      }
      this.enterPressed=this.enterPressed.bind(this);
      this.changeState=this.changeState.bind(this);
      this.pwd=this.pwd.bind(this);
      this.cd=this.cd.bind(this);
      this.ls=this.ls.bind(this);
      this.cat=this.cat.bind(this);
      this.help=this.help.bind(this);
      this.root = makeTree();
      this.current=this.root;
      // console.log(this.current);
    }

    topre=str=>'<pre>'+str+'</pre>'

    pwd=(argument)=>{
      if(argument!==''){
        this.changeState("Invalid command, no argument required.");
      }else{
        this.changeState(Tree.pwd(this.current));
      }
    }

    ls=(argument)=>{
      const obj = Tree.ls(this.current,this.root,argument);
      if(obj.err===""){
        this.changeState(this.topre(obj.str));
      }else{
        this.changeState(obj.err);
      }
    }

    cat=(argument)=>{
      if(argument===""){
        this.changeState("Invalid command, argument required.");
      }else{
        let obj = Tree.cat(this.current,this.root,argument);
        if(obj.err!==""){
          this.changeState(obj.err);
        }else{
          const str = obj.current.value;
          this.changeState(constants[str.substring(0,str.length-5)]);
        }
      }
    }

    cd=(argument)=>{
      if(argument===''){
        this.changeState("Invalid command, argument required.");
      }else{
        let obj = Tree.cd(this.current,this.root,argument);
        if(obj.err!==''){
          this.changeState(obj.err);
        }else{
          this.current=obj.current;
          this.changeState("Present working directory changed.");
        }
      }
    }

    help=(argument)=>{
      this.changeState(constants.help);
    }

    execute(code,argument){
      switch(code){
        case "pwd" : this.pwd(argument);break;
        case "ls" : this.ls(argument);break;
        case "cat" : this.cat(argument);break;
        case "cd" : this.cd(argument);break;
        case "help" : this.help(argument);break;
        default:break;
      }
    }

    enterPressed(command){
      command = command.trim();
      let code = "";
      let argument = "";
      let i;
      for(i=0;i<command.length;i++){
        if(command[i]===' ')
          break;
        code+=command[i];
      }
      for(;i<command.length;i++){
        if(command[i]!==' '){
          break;
        }
      }
      for(;i<command.length;i++){
        if(command[i]===' ')
          break;
        argument+=command[i];
      }
      this.execute(code,argument);
    }

    changeState(output){
      this.setState({output});
    }

    componentDidMount(){
      this.changeState(constants.help);
    }

    render(){
      return (
        <div className="App">
          <Textarea onEnterPressed={this.enterPressed}/>
          <div className="command-output shadow">
             <Typer 
              className="outputText"
              stringToBePrinted={this.state.output}
              timestep={10}
             />
          </div>
        </div>
      );
    }
}

export default App;
