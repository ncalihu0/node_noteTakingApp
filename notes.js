//importing the fs module. The files system provides functions for interacting with our files system such as reading and writing files. 
const fs = require('fs')

//importing the chalk library which is used to add color to the console output in the terminal
const chalk = require('chalk')

//creates the addNote function which takes in the title and the body as parameters
const addNote = (title, body) => {

    //setting our function loadNotes to notes which retrieves existing notes from the notes.json file
    const notes = loadNotes()

    //our duplicateNote variable holds notes with the same title by using the find array method
    const duplicateNote = notes.find((note) => note.title === title)

    //if we don't have duplicate notes, the newly note is pushed with the title and body that was inputed
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        //then with our fucntion saveNotes it displays in green that our note was succesfully added
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        //if a duplicate is found, it displays a red message that the note is already there 
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

//we create a function removeNote that is used in the app.js with the parameter title
const removeNote = (title) => {
    //create a variable note which is set to out loadNotes function which retrieves existing notes from the notes.json file
    const notes = loadNotes()

    //our notesToKeep variable holds notes with different titles by using the filter array method
    const notesToKeep = notes.filter((note) => note.title !== title)

    //if the note length loaded is larger than the notesToKeep length, it console logs in green that the note is removed and the notesToKeep is saved 
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        //it gives an error that the note that we tried to delete doesn't exist 
        console.log(chalk.red.inverse('No note found!'))
    }
}


const listNotes = () => {
    //create a variable note which is set to out loadNotes function which retrieves existing notes from the notes.json file
    const notes = loadNotes()

    //first it teels the using your notes and follows it with a forEach method
    console.log(chalk.inverse('Your notes'))

    //this method itirate though every note the user has and displays it back to them
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    //create a variable note which is set to out loadNotes function which retrieves existing notes from the notes.json file
    const notes = loadNotes()

    //create a varible note which is set to the find method which is set to the title
    const note = notes.find((note) => note.title === title)

    //the note is going to be logged with the title and the body
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        //if the note can't be found, and error is given in red 
        console.log(chalk.red.inverse('Note not found!'))
    }
}

//creates the saveNotes function which takes the parameter of notes
const saveNotes = (notes) => {

    //create the dataJSON variable which converts the notes object into a JSON-format string using the stringify method
    const dataJSON = JSON.stringify(notes)

    //using the file system module, it will wait until teh file write operation is complete before moving on. this takes in our 
    //variable dataJSON and moves it to our notes.json file
    fs.writeFileSync('notes.json', dataJSON)
}


//create the loadNotes function which is responsible for loading notes from a file
const loadNotes = () => {

    //this try begins a try-catch block which handles errors that may occur
    try {
        //create the variable dataBUffer which is set to our file system with the readFileSync that reads the content in the notes.json file synchronously 
        const dataBuffer = fs.readFileSync('notes.json')

        //converts our buffer on top into a string since its usally read in binary
        const dataJSON = dataBuffer.toString()

        //it parses our JSON onto an object and returns it 
        return JSON.parse(dataJSON)
    } catch (e) {
        // if theres any errors, the catch returns and empty array
        return []
    }
}


//with the module.exports it allows to exports our function above so that the notes.js files can access them when they're called on
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}