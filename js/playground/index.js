/* @flow */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { convertToHTML } from 'draft-convert';
import { convertDraftToHTML, convertHTMLToDraft } from '../src/Utils/draftHTMLConverter';
import draftToMarkdown from 'draftjs-to-markdown'; // eslint-disable-line import/no-extraneous-dependencies
import {
  convertFromHTML,
  convertToRaw,
  convertFromRaw,
  ContentState,
  EditorState,
} from 'draft-js';
import { Editor } from '../src';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class TestOption extends Component {
  render() {
    return <div>testing</div>;
  }
}

class TestOption2 extends Component {
  render() {
    return <div>resting</div>;
  }
}

  const htmlToDraftContentState = convertToRaw(
    convertHTMLToDraft('<p><span style="color:rgb(97,189,109);font-size:18px;background-color:rgb(247,218,100)">Lorem</span> ' +
      '<a href="goolge.com" target="_self">dolor</a> sit amet, consectetur adipiscing elit. Mauris tortor felis, volutpat sit amet ' +
      'maximus nec, tempus auctor diam. Nunc odio elit,  ' +
      'commodo quis dolor in, sagittis scelerisque nibh. ' +
      'Suspendisse consequat, sapien sit amet pulvinar  ' +
      'tristique, augue ante dapibus nulla, eget gravida ' +
      'turpis est sit amet nulla. Vestibulum lacinia mollis  ' +
      'accumsan. Vivamus porta cursus libero vitae mattis. ' +
      'In gravida bibendum orci, id faucibus felis molestie ac.  ' +
      'Etiam vel elit cursus, scelerisque dui quis, auctor risus.</p>' +
      '<img src="http://i.imgur.com/aMtBIep.png" /><p></p>' +
      '<table><tbody><tr><td>table</td><td>come</td><td>will</td></tr><tr><td>it</td><td>cool</td></tr></tbody></table>'
      )
    );

const rawContentState = {
  "entityMap": {
    "0": {
      "type": "TABLE",
      "mutability": "IMMUTABLE",
      "data": {
        grids: [
          ['table', 'come'],
          ['it', 'cool']
        ]
      }
    }
  },
  blocks: [
    {
      "key":"3q6ro",
      "text":"testing",
      "type":"unstyled",
      "depth":0,
      "inlineStyleRanges":[
        {"offset":0,"length":7,"style":"fontsize-24"},{"offset":0,"length":7,"style":"fontfamily-Times New Roman"},{ offset: 0, 'length':7,style:'color-rgb(209,72,65)'}
      ],
      entityRanges:[],
      data: {}
    },
    {
      "key": "fa3kv",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [
        {
          "offset": 0,
          "length": 1,
          "key": 0
        }
      ],
      "data": {}
    },
    {
      "key":"f16va",
      "text":"",
      "type":"unstyled",
      "depth":0,
      "inlineStyleRanges":[],
      entityRanges:[],
      data: {}
    },
  ],
};

class Playground extends Component {

  state: any = {
    editorContent: undefined,
    contentState: rawContentState,
    editorState: EditorState.createEmpty(),
  };

  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(htmlToDraftContentState)),
    }
  }

  onEditorChange: Function = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  clearContent: Function = () => {
    this.setState({
      contentState: convertToRaw(ContentState.createFromText('')),
    });
  };

  onContentStateChange: Function = (contentState) => {
    console.log('contentState', contentState);
  };

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  imageUploadCallBack: Function = file => new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
        const data = new FormData(); // eslint-disable-line no-undef
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );

  render() {
    const { editorContent, contentState, editorState } = this.state;
    return (
      <div className="playground-root">
        <div className="playground-label">
          Toolbar is alwasy <sup>visible</sup>
        </div>
        <button onClick={this.clearContent} tabIndex={0}>Force Editor State</button>
        <div className="playground-editorSection">
          <div className="playground-editorWrapper">
            <Editor
              tabIndex={0}
              editorState={editorState}
              toolbarClassName="playground-toolbar"
              wrapperClassName="playground-wrapper"
              editorClassName="playground-editor"
              toolbar={{
                history: { inDropdown: true },
                inline: { inDropdown: false },
                list: { inDropdown: true },
                link: { showOpenOptionOnHover: false },
                textAlign: { inDropdown: true },
                image: { uploadCallback: this.imageUploadCallBack },
              }}
              onEditorStateChange={this.onEditorStateChange}
              onContentStateChange={this.onEditorChange}
              placeholder="testing"
              spellCheck
              toolbarCustomButtons={[<TestOption />, <TestOption2 />]}
              onFocus={() => {console.log('focus')}}
              onBlur={() => {console.log('blur')}}
              onTab={() => {console.log('tab'); return true;}}
              localization={{ locale: 'zh', translations: {'generic.add': 'Test-Add'} }}
              readOnly={false}
              mention={{
                separator: ' ',
                trigger: '@',
                caseSensitive: true,
                suggestions: [
                  { text: 'A', value: 'AB', url: 'href-a' },
                  { text: 'AB', value: 'ABC', url: 'href-ab' },
                  { text: 'ABC', value: 'ABCD', url: 'href-abc' },
                  { text: 'ABCD', value: 'ABCDDDD', url: 'href-abcd' },
                  { text: 'ABCDE', value: 'ABCDE', url: 'href-abcde' },
                  { text: 'ABCDEF', value: 'ABCDEF', url: 'href-abcdef' },
                  { text: 'ABCDEFG', value: 'ABCDEFG', url: 'href-abcdefg' },
                ],
              }}
            />
          </div>
          { editorState &&
            <textarea
              className="playground-content no-focus"
              value={
                convertDraftToHTML(editorState.getCurrentContent())
              }
            />
          }
          {/* <textarea
            className="playground-content no-focus"
            value={draftToMarkdown(editorContent)}
          /> */}
          <textarea
            className="playground-content no-focus"
            value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Playground />, document.getElementById('app')); // eslint-disable-line no-undef


/**
const rawContentState = ;


toolbar={{
  inline: {
    inDropdown: true,
  },
  list: {
    inDropdown: true,
  },
  textAlign: {
    inDropdown: true,
  },
  link: {
    inDropdown: true,
  },
  image: {
    uploadCallback: this.imageUploadCallBack,
  },
  history: {
    inDropdown: true,
  },
}}*/
// {"entityMap":{},"blocks":
// [{"key":"3q6ro","text":"testing iehfciwehcwjvbjhsvsvv","type":"header-six","depth":0,"inlineStyleRanges":
// [{"offset":0,"length":29,"style":"fontsize-24"},{"offset":0,"length":29,"style":"fontfamily-Times New Roman"},{"offset":0,"length":29,"style":"color-rgb(209,72,65)"}],"entityRanges":[],"data":{}},{"key":"6789c","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b2fnq","text":"testing","type":"unstyled","depth":0,"inlineStyleRanges":
// [{"offset":0,"length":7 ,"style":"fontsize-24"},{"offset":0,"length":7, "style":"fontfamily-Times New Roman"},{"offset":0,"length":7,"style":"color-rgb(209,72,65)"}],"entityRanges":[],"data":{}}]}
