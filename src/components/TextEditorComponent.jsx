import React, {Component} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faAlignCenter,
	faAlignLeft,
	faAlignRight,
	faBold,
	faItalic,
	faUnderline
} from "@fortawesome/free-solid-svg-icons";

const Toolbar = styled('div')`
	font-weight: normal;
	text-align: center;
	width: 60%;
	margin: 0 auto;
	font-weight: bold;
	${'#toolbar'}{
		${'button'}{
			&:hover{
				cursor: pointer;
				background-color: rgba(0,0,0,0.2);
			}
			border: none;
			padding:10px;
			margin-left: 3px;
		}
	}
	background-color: darkgrey;
`;
const TextArea = styled('div')`
	background-color: whitesmoke;
	width: 60%;
	margin: 0 auto;
	height: 400px;
	box-sizing: border-box;
	border: 1px #282c34 solid;
`
class TextEditorComponent extends Component {
	componentDidMount(){
		const editor = document.querySelector('.editor');
		editor.contentEditable = true;
		var observer = new MutationObserver(this.observer);
		let config = {
			attributes: true,
			childList: true,
			characterData: true,
			subtree: true,
		};
		observer.observe(editor, config);
	};

	command = (e,name,size) => {
		let success;
			try {
				success = document.execCommand(name, false, null);
			} catch (error) {
				alert(error);
			}

		if (!success) {
			const supported = this.isSupported(name);
			const message = supported ? 'Unknown error. Is anything selected?' : 'Browser Not Support this commands.';
			alert(message);
		}
	};

	isSupported = (name) => {
		return document.queryCommandSupported(name);
	};

	dataChange(ev){
		this.setState({[ev.target.name]:ev.target.value })
	};

	checkMutation = (mutation) => {
		const editor = document.querySelector('.editor').innerHTML;
		this.props.handleContent(editor);
	};

	observer = (mutations) => {
		mutations.forEach(this.checkMutation);
	};

	getAttribute = (mutation) => {
		return mutation.target.parentElement && mutation.target.parentElement.attributes[0] && mutation.target.parentElement.attributes[0].value;
	};
	render() {
		return (
			<React.Fragment>
			<Toolbar>
				<div id={'toolbar'}>
					<div>Tool Bar</div>
					<button onClick={(event)=>this.command(event,'bold',null)}><FontAwesomeIcon icon={faBold}/></button>
					<button onClick={(event)=>this.command(event,'italic',null)}><FontAwesomeIcon icon={faItalic}/></button>
					<button onClick={(event)=>this.command(event,'underline',null)}><FontAwesomeIcon icon={faUnderline}/></button>
					<button onClick={(event)=>this.command(event,'justifyLeft',null)}><FontAwesomeIcon icon={faAlignLeft}/></button>
					<button onClick={(event)=>this.command(event,'justifyCenter',null)}><FontAwesomeIcon icon={faAlignCenter}/></button>
					<button onClick={(event)=>this.command(event,'justifyRight',null)}><FontAwesomeIcon icon={faAlignRight}/></button>
				</div>
			</Toolbar>
				<TextArea className={'editor'} dangerouslySetInnerHTML={ {__html: this.props.content}}/>
			</React.Fragment>

		);
	}
}


export default TextEditorComponent;