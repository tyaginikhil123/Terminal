function Node(value){
    this.value = value;
    this.parent = null;
    this.children = [];

    this.setParentNode = function(node) {
        this.parent = node;
    }

    this.getParentNode = function() {
        return this.parent;
    }

    this.addChild = function(node) {
        node.setParentNode(this);
        this.children[this.children.length] = node;
    }

    this.getChildren = function() {
        return this.children;
    }

}

const traverse = (current,root,argument)=>{
    if(argument[argument.length-1]==='/'){
        argument = argument.substring(0,argument.length-1);
    }
    let argArray=argument.split("/");
    let index=0;
    let err="";
    let len=argArray.length;
    if(argArray[0]==='root.dir'){
        current=root;
        index=1;
    }
    while(index<len){
        if(argArray[index]==='.'){
            index++;
            continue;
        }else if(argArray[index]==='..'){
            current=current.getParentNode();
            if(current===null){
                err="Invalid path.";
                break;
            }
        }else{
            let childArray=current.getChildren();
            let i;
            for(i=0;i<childArray.length;i++){
                if(childArray[i].value===argArray[index]){
                    current=childArray[i];
                    break;
                }
            }
            if(i===childArray.length){
                err="Invalid path."
                break;
            }
        }
        index++;
    }
    return {
        current,
        err
    }
}

export default ()=>{
    let root = new Node("root.dir");
    let about = new Node("about.dir");
    let projects = new Node("projects.file");
    let personal = new Node("personalInfo.file");
    let education = new Node("education.file")
    let social = new Node("socialMediaHandles.file");

    social.setParentNode(about);
    education.setParentNode(about);
    personal.setParentNode(about);
    projects.setParentNode(root);
    about.setParentNode(root);
    about.addChild(personal);
    about.addChild(education);
    about.addChild(social);
    root.addChild(about);
    root.addChild(projects);
    return root;
}

export const pwd = (node)=>{
    const stack=[];
    while(node!==null){
        stack.push(node);
        node=node.getParentNode();
    }
    let str=stack[stack.length-1].value;
    stack.pop();
    while(stack.length!==0){
        str+='/'+stack[stack.length-1].value;
        stack.pop();
    }
    return str;
}

export const cd = (current,root,argument)=>{
    let obj = traverse(current,root,argument);
    if(obj.err==="" && obj.current.value.includes("file")){
        obj.err = "Not a directory.";
    }
    return obj;
}

export const ls = (current,root,argument)=>{
    let str="";
    let err="";
    if(argument===''){
        current.getChildren().forEach(element => {
            str+=element.value+"\n";
        });
    }else{
        let obj = traverse(current,root,argument);
        if(obj.err!==""){
            err=obj.err;
        }else if(obj.current.value.includes(".file")){
            err="Not a directory.";
        }else{
            obj.current.getChildren().forEach(element=>{
                str+=element.value+"\n";
            });
        }
    }
    return {
        err,str,
    }
}

export const cat = (current,root,argument)=>{
    let obj = traverse(current,root,argument);
    if(obj.err==="" && obj.current.value.includes("dir")){
        obj.err = "Not a file.";
    }
    return obj;
}
