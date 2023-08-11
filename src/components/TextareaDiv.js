import React from "react";
import "../styles/TextareaDiv.css";
import "../styles/shadow.css";
import Blinker from "./Blinker";

export default class Textarea extends React.Component{
    constructor(props){
        super(props);
        this.textareaRef=React.createRef();
        this.state={
            value:"",
        };
        this.inputKeyPressed=this.inputKeyPressed.bind(this);
    }

    inputKeyPressed(event){
        var isPrintable=/^[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]$/i.test(event.key);
        var prev=this.state.value;
        var value;
        if(isPrintable){
            value=prev+event.key;
            this.setState({value});
        }else if(event.key==="Backspace"){
            value=prev.substring(0,prev.length-1);
            this.setState({value});
        // }else if(event.key===" "){
        //     value=prev+"&nbsp;";
        //     this.setState({value});
        }else if(event.key==="Enter"){
            this.props.onEnterPressed(this.state.value);
        }else{
            console.log(event.key);
        }
    }

    componentDidMount(){
        document.addEventListener("keydown",this.inputKeyPressed,false);
    }
    componentWillMount(){
        document.removeEventListener("keydown",this.inputKeyPressed,false);
    }
    render=()=>{
        return (
            <div className="command-input shadow">
                <div>&nbsp;&nbsp;&gt;&nbsp;{this.state.value}</div>
                {/* <span className="cursor">&nbsp;&nbsp;</span> */}
                <Blinker color="green"/>
            </div>
        )
    }
}