# Project Milestone 1 Assignment #
## Team He ##
## Application: Dialect Dictionary ##
## Team Overview ##
Zipei Jiang github: zipeijiang

Haoqin Liang github: Leonalhq & Leonalhqkun

Haoqin Liang github: Leonalhq


Addis Gunst github: AddieGunst
## API ##
### Object Model
#### User object
    key                value type             description
    ID                 int                        the unique ID of user
    name              string                    the name of the user
    portrait           string                    the source url of the user’s portrait image
    registered_at       time            the date the user registered
    location          string                    the address string of the user
    password        string                    the password of the user
    contribution    int                        the number of pronunciations the user uploaded
    collection        array[string]          the list of prouncitaion the user liked
#### Word object
    key                value type             description
    word             string                    the spelling of the word in English
    img                string                   the source url of the image describes the word
    languages        array[string]          the list of languages with descriptions to the word
    changelog       array[change]         the list of changes made by users

#### Definition object
    key         value type      description
    word		string			word the definiition decribes
    languages  array[string]  the list of languages with descriptions to the word
    definition array[string]  the list of defintion follow by the (word,languages)

#### Pronunciation object
    key                value type                 description
    ID                 int                        the unique randomly generated ID
    word              string                  the spelling of the word the pronunciation descripes
    pronunciation   audio                    the audio file of the pronunciation
    address         string                    the address string of the location the dialect comes from
    creatorID        int                        the user ID of the creator
    likes              int                        the number of likes the pronunciation receives
    comments    array[comment]             the list of comment object to the pronunciation
    liked             array[string]           the list of user who like the pronunciation

 
#### Change object
    key            	value type         	description
    ID             	int                    	the unique randomly generated ID
    wordID      	int                    	the spelling of the word the change object link to
    creatorID    	int                    	the user ID of the creator
    action         	string                	the action the user did, can be ‘create word’, ‘add pronunciation’, ‘update definition’
    date           	time                  	the time the change occurred
     
#### Comment object
    key     	   	value type         	description
    proID             int                     the ID of the pronunciation of the comment
    creatorID    	    int                    	the user ID of the creator user
    data           	string                	the comment added by the user
    date           	time                  	the time the comment is added

    ### End Points

### USER
#### /register      	
	Allows new users to sign up
	Parameters: name(user name), password(user password)
	Optional Parameters: portrait(url to the user portrait image), location(user address)

#### /login         	
	Allows users to login their account
	Parameters: name(user name), password(user password)

### WORD
#### /word/new
    Allows a word to be added to the database, creates a new word object.
    Parameters: name(spelling in English), img(url to the image)
    Optional Parameters: languages(languages to describe the word), definition(description to the word)
    Automatically generates change object with user ID and time, with action value = ‘create word’

#### /word/pronunciation
    Create a pronunciation object that allows users to add new pronunciations to a word
    Parameters: word(word for pronunciation), pron(audio file of pronunciation)
    Optional parameters: addr(user address), language(language for the pronunciation), spelling(spelling for the pronunciation)
    Automatically generates change object with user ID and time, with action value = ‘add pronunciation’

#### /word/definition
    Allows users to add/modify definitions of the word by update the definition of the word
    Parameters: word(word for definition), languages(language of the description), def(string of descriptions)
    Automatically generates change object with user ID and time, with action value = ‘update definition’

#### /word/comment
    Create a comment object that allows users to comment on the pronunciation they chose
    Parameters: userID(ID of the user), proID(ID of the pronunciation), comment(string)

#### /word/view
    Return the word, the imge of the word, the list of languages for definition
    Parameter: word(spelling of the word in English)

#### /word/getDefinitionByLanguage
    Return the definition of the word in the languages passed
    Parameter: word, language(language for definition)

#### /word/delete
    Delete the word from the database
    Parameter: word(word to delete)

#### /word/delpronunciation
    Delete the pronunciation with given ID from the database
    Parameter: ID(pronunciation ID to delete)


### PRONUNCIATION
#### /pronu/checkword
    Allows user to check the word is exists, if not they need to add that word in word/new
    Parameters: word(string)
    
#### /pronu/create
    Create a pronunciation object that allows users to add new pronunciations to a word
    Parameters: word(word for pronunciation), pron(audio file of pronunciation)
    Optional parameters: addr(user address), language(language for the pronunciation), spelling(spelling for the pronunciation)
    Automatically generates change object with user ID and time, with action value = ‘add pronunciation’
    
#### /pronu/view
    Return the list pronucition, the imge of the word, and the word definition 
    Parameter: word(spelling of the word in English),language(language for definition)

#### /pronu/getpronubyclick
    Return the pronunciation of the word for the sepecific id
    Parameter: word, language(language for definition),id(by frontend click)
    
#### /pronu/delpronunciation
    Delete the pronunciation with given ID from the database
    Parameter: ID(pronunciation ID to delete)
    


## Front-end CRUD Implementation ##

### Word Creation
![wordCreate](/screen_shots/wordCreate.PNG)
### Word Definition Upload
![wordUpload](/screen_shots/wordDefUpdate.PNG)

### Word Basic Info/Definition Read
![wordRead](/screen_shots/wordRead.PNG)
![wordDefRead](/screen_shots/wordDefRead.PNG)

### Word Deletion
![wordDelete](/screen_shots/wordDelete.PNG)

## Division of labor
Addis Gunst: Front-end and back-end coding (ts, HTML) on pronunciation CRUD

Haoqin Liang: Front-end and back-end coding (ts, HTML) on word CRUD. Heroku deployment,CRUD pronu and modify

Zipei Jiang: Building the basic skeleton of the database and server, front-end and back-end (ts, HTML) coding on definition CRUD.

