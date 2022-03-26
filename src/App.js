import './App.css';
import React from 'react';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input:'',
      showInput: false,
      notesArr: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Show Note input
  showInput() {
  this.setState({ showInput: !this.state.showInput })
  }
  // onChange update input state
  handleChange(e) {
    this.setState({ input: e.target.value });
  }
  // Add Note
  handleSubmit(e) {
    e.preventDefault();
    // Don't submit if input is empty
    if(this.state.input === '') {
      return;
    } 
      
    
    // create copy of notesArr
    let notesArr = this.state.notesArr.slice();
    // add new note as an object with a note and edit property 
    let noteObj = { note: this.state.input, editing: false };
    // add note object to notes array 
    notesArr = notesArr.concat(noteObj);
    // set new notes array as notesArr state
    this.setState({
      input: '',
      notesArr: notesArr,
      showInput: false,
    })
  
  }
  
  // Edit Note
  editNote(i) {
    // create copy of notesArr
    let notesArr = this.state.notesArr.slice();
    // update the correct note object by using i - change editing to true
    notesArr.splice(i, 1, { note: notesArr[i].note, editing: true })
    // set input to note content in edit field and set notesArr state to update notesArr array
    this.setState({ input: notesArr[i].note, notesArr: notesArr });
  }
  // Submit edited note
  editSubmit(e, i) {
    e.preventDefault(); 

    let notesArr = this.state.notesArr.slice();
    // update the correct object by using i - set note property to input state value and change editing to false
    notesArr.splice(i, 1, { note: this.state.input, editing: false })
    // update state 
    this.setState({ input: '', notesArr: notesArr });
  }
  
  // Delete Note
  deleteNote(i) {
    // create array of notes state 
    let notesArr = this.state.notesArr.slice();
    // Remove selected note from array
    notesArr.splice(i, 1)
    // set array to notes state
    this.setState({ notesArr: notesArr });
  }

  render() {

    const noteList = this.state.notesArr.map((note, i) => {
      // if a note's editting property is false then show note, else show edit form 
      if(!note.editing) {
        return <li key={i}>{note.note} <button onClick={() => this.editNote(i)}>Edit</button><button onClick={ () => this.deleteNote(i) }>Del</button></li>
      } else {
        return (
          <form onSubmit={(e) => this.editSubmit(e, i)} key={i}>
            <textarea value={this.state.input} onChange={this.handleChange}></textarea>
            <input type="submit" value="Submit" />
          </form>
        )
      }
    })

    return (
      <div className="App">
        <h1>Notes</h1>
        {/* If showInput is not true then show 'Add note' button, else show note form  */}
        { !this.state.showInput ? 
          <button onClick={() => this.showInput()}>Add Note</button> : 
          <form onSubmit={this.handleSubmit}>
            <label>Add Note</label><br />
            <textarea value={this.state.input} onChange={this.handleChange}></textarea> <br />
            <input type="submit" value="Submit" />
          </form> }

          <h2><u>My Notes</u></h2>
          <ul>
            {noteList}
          </ul>

      </div>
    );
  }
}

export default App;
