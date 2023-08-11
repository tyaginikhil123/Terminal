import React from "react";

export default class TypeComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            innerHTML:``,
        }
        this.timeoutHandler=undefined;
        this.timeoutHandler1=undefined;
        this.update=this.update.bind(this);
        this.printText=this.printText.bind(this);
    }

    printText(str,index,time){
        if(index>=this.length)
            return;
        let innerHTML=this.state.innerHTML;
        innerHTML+=str[index];
        this.setState({innerHTML});
        this.timeoutHandler=setTimeout(()=>{this.printText(str,index+1,time)},time);
        this.removeTimeouts=this.removeTimeouts.bind(this);
    }

    update(){
        this.length=this.props.stringToBePrinted.length;
        this.printText(this.props.stringToBePrinted,0,this.props.timestep);
        // this.setState({innerHTML:this.props.stringToBePrinted});
    }

    componentDidMount(){
        this.update();
    }

    removeTimeouts(){
        if(this.timeoutHandler){
            clearTimeout(this.timeoutHandler);
        }
        if(this.timeoutHandler1){
            clearTimeout(this.timeoutHandler1);
        }
    }

    componentWillUnmount(){
        this.removeTimeouts();
    }

    componentDidUpdate(prevProps){
        if(prevProps.stringToBePrinted!==this.props.stringToBePrinted){
            this.setState({innerHTML:``});
            this.removeTimeouts();
            this.timeoutHandler1=setTimeout(()=>this.update(),200);
        }
    }

    render(){
        return (
        <div className={this.props.className} 
         dangerouslySetInnerHTML={{__html : this.state.innerHTML}}>
        </div>
        );
        // let str="<pre><span>hello hi</span><a>bye</a></pre>";
        // return (
        //     <div dangerouslySetInnerHTML={{__html:str}}></div>
        // );
    }

}