// const chalk = require('chalk')

//Importing the yargs library which helps in parsing command-line arguments. 
const yargs = require('yargs')

//Importing the file notes.js which has our functions
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command for the command-line application. This object contains properties command(the name of the command), 
//describe(what the command does), builder(options of what the command can do), and handler(a function which executes when the command is called)
yargs.command({
    command: 'add',
    describe: 'Add a new note',

    //In the builder, it shows us the options for our command. There is the title and body option. Each have a description, the options, and the type. 
    //Essentially it should take a note written in characters with a title and what the user adds. 
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },

    //This function is executed when the add command is called upon. it calls upon the addNote function from our file notes.js and gives the arguments of title and body. creates a new note
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command for the command-line application. This object contains properties such as the command(the name of this command), 
//describe(a description of what is does), the builder(options for the command), and handler(what is executed when the command remove is called on)
yargs.command({
    command: 'remove',
    describe: 'Remove a note',

    //inside the builder we have the title(which is choosen based on what note you want to remove), this has to be inputed as a string.
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },

    //this functions executes when the command remove is called upon. It access the removeNote function from the notes.js file with the argument of title. removes a note
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create list command for the command-line application. This object contains the command(the name of it when is called upon), 
//describe(the description of this command), and a handler(what is executed when command list is called upon)
yargs.command({
    command: 'list',
    describe: 'List your notes',

    //this function runs when the list command is called on which access the listNotes function from the notes.js. it creates a list 
    handler() {
        notes.listNotes()
    }
})

// Create read command for the command-line application. this object contains contains command(name of it when is called upon),
//describe(a description of this command), builder(options for the command), and handler(whats executed when command read is called on)
yargs.command({
    command: 'read',
    describe: 'Read a note',

    //takes in the title of the note you have and it has to be written in characters 
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },

    //this function runs when the read command is called on. It access the readNote function from the notes.js file and takes in the title as the argument.
    //displays the note's title and body
    handler(argv) {
        notes.readNote(argv.title)
    }
})

//this parses the command-line arguments. Part of the compilation proccess, it essentially determines if input is valid or not
yargs.parse()