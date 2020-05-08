Final Project #
## Team He ##
## Application: Dialect Dictionary ##
## Spring 2020 ##
## Overview ##
Our application is a platform that aims to share the knowledge and charm of different dialects to the world. The application allows users to record their own dialect as well as learn dialects from others. According to our design, all words in different dialects will refer to the same object which is connected by one unique image of that object. This way, the users can easily understand the words and have a connection without knowledge on any standard languages. The purpose of this platform is to protect the historic heritage of dialects which are facing the challenge of extinction nowadays. We will solve this problem by providing a convenient and straightforward way for users to share and learn them. We hope that this platform can also be a compliment for traditional dictionaries, which normally have the data for standard languages only. The application will allow users to upload an image, the spelling, the standard language, pronunciation, and location of the word.  
## Team Members##
Zipei Jiang github: zipeijiang

Haoqin Liang github: Leonalhq & Leonalhqkun

Addis Gunst github: AddieGunst

## User Interface ##

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

## URL Routes/Mappings ##
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
    
## Authentication/Authorization ##

## Division of Labor ##

Addis Gunst: HTML and CSS for the page for users to submit data. Front-end and back-end coding (ts, HTML) on pronunciation CRUD. Implemented back-end functions for APIs: addpronunciation, getpronunciation, addPronunLikes, deletePronun. Implemented front-end functions to add pronunciation in upload.html, add likes to pronunciation and delete pronunciation in wordPage.html

Zipei Jiang: HTML and CSS for the page for users to view data of each words.  Building the basic skeleton of the database and server, front-end and back-end (ts, HTML) coding on definition CRUD. Implemented back-end functions for APIs: addcomment, delcomment, getcomment. Implemented front-end functions to load word/pronunciation information to wordPage.html, functions to retrieve/add definitions to word in wordPage.html, functions to get/add comments.

Haoqin Liang: HTML and CSS for the homepage of the website and the navigation bar of the website. Front-end and back-end coding (ts, HTML) on word CRUD. Heroku deployment,CRUD pronu and modify.  Implemented back-end functions for APIs: signup, login, changeinfo, mainview. Implemented all front-end functions for user sign in and sign up. Implemented the front-end html for main page.

## Conclusion ##
The team found that the design and implementation process was challenging but doable. We learned a lot through the design and implementation process because most of us had no experience in html, css, javascript, and typescript. We had experience in database queries because we took Compsci 345 but did not know how to integrate a SQL database to our backend. The in-class exercises were very helpful starters to implement our PCRUD server and SQL database queries. Some challenges we faced were deploying everything on Heroku and getting our server to connect up with our data model with the user interface. In addition, we had trouble redirecting/routing to pages with parameters. Finally, because of the quarentine and online classes, it was difficult to collaborate and communicate remotely. Our team would have liked to learn the general structure of a website going into the project so it would be easier on us when implementing the different parts. 





