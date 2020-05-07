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
#### UserInfo object
    key             value type              description
    ID              string                  the unique ID of user
    username        string                  the name of the user
    portrait        string                  the source url of the user’s portrait image
    registered_at   time                    the date the user registered
    location        string                  the address string of the user
    password        string                  the password of the user

#### UserWord object
    key             value type              description
    ID              string                  the unique ID of user
    word            string                  the word the user creates

#### Word object
    key              value type             description
    word             string                 the spelling of the word in English
    img              string                 the source url of the image describes the word
    languages        array[string]          the list of languages with descriptions to the word
    view             number                 counts how many times the word is viewed

#### Definition objects - there exists multiple definition table corresponds to different languages
    key             value type              description
    word		    string			        word the definiition decribes
    definition      string                  the of defintion of the word in certain language

#### Pronunciation object
    key                 value type                  description
    ID                  int                         the unique randomly generated ID
    word                string                      the spelling of the word the pronunciation descripes
    pronunciation       audio                       the audio file of the pronunciation
    address             string                      the address string of the location the dialect comes from
    userID              int                         the user ID of the creator
    likes               int                         the number of likes the pronunciation receives

#### Comment object
    key     	   	value type         	description
    ID              int                 the unique id of each comment
    proID           int                 the ID of the pronunciation of the comment
    creatorID    	int                 the user ID of the creator user
    text           	string              the comment added by the user
    date           	time                the time the comment is added

    ### End Points

## URL Routes/Mappings ##
### Main
#### /mainview
    Retrieve words from database
    Parameters: none

#### /getDefinitionByLanguage & /word/getDefinitionByLanguage
    Retrieve the definition of a word in certain language
    Parameters: word(spelling of the word), language

### USER
#### /siginup      	
	Allows new users to sign up
	Parameters: id(user id), name(user name), password(user password), portrait, location

#### /login         	
	Allows users to login their account
	Parameters: id(user id), password(user password)

#### /changeinfo
    Allows users to change their information
	Parameters: id(user id), name(user name), password(user password), portrait, location

#### /getuserinfo
    Retrieves the user information
    Parameters: user id

### WORD
#### /word/new
    Allows a word to be added to the database, creates a new word object.
    Parameters: name(spelling in English), img(url to the image), languages(languages to describe the word), definition(description to the word)

#### /word/definition
    Allows users to add/modify definitions of the word by update the definition of the word
    Parameters: word(word for definition), languages(language of the description), def(string of descriptions)

#### /word/delete
    Delete the word from the database
    Parameter: word(word to delete)
#### /word/view
    Return the word, the imge of the word, the list of languages for definition
    Parameter: word(spelling of the word in English)

#### /word/viewuser
    Get the information of the user
    Parameter: id(user id)

### Comment
#### /word/addcomment
    Add comment to a pronunciation
    Parameters: pronunID(Id of the pronunciation), user(uploader), text(text of the comment)
#### /word/getcomment
    Get all comments of a pronunciation
    Parameters: pronunID(Id of the pronunciation)
#### /word/delcomment
    Delete a comment of a pronunciation
    Parameters: ID (Id of the comment)
#### /word/comment
    Create a comment object that allows users to comment on the pronunciation they chose
    Parameters: userID(ID of the user), proID(ID of the pronunciation), comment(string)

### PRONUNCIATION
#### /word/pronunciation
    Create a pronunciation object that allows users to add new pronunciations to a word
    Parameters: word(word for pronunciation), pron(audio file of pronunciation), location(dialect location)

#### /word/delpronunciation
    Delete the pronunciation with given ID from the database
    Parameters: ID(pronunciation ID to delete)

#### /word/getpronunciation
    Return the list of pronunciations of a word
    Parameters: word(spelling of the word)

#### /word/addPronunLikes
    Increase the number of likes by 1 to the word
    Parameters: pronID(Id of the pronunciation)
    
## Authentication/Authorization ##

## Division of Labor ##

Addis Gunst: HTML and CSS for the page for users to submit data. Front-end and back-end coding (ts, HTML) on pronunciation CRUD. Implemented back-end functions for APIs: addpronunciation, getpronunciation, addPronunLikes, deletePronun. Implemented front-end functions to add pronunciation in upload.html, add likes to pronunciation and delete pronunciation in wordPage.html

Zipei Jiang: HTML and CSS for the page for users to view data of each words.  Building the basic skeleton of the database and server, front-end and back-end (ts, HTML) coding on definition CRUD. Implemented back-end functions for APIs: addcomment, delcomment, getcomment. Implemented front-end functions to load word/pronunciation information to wordPage.html, functions to retrieve/add definitions to word in wordPage.html, functions to get/add comments.

Haoqin Liang: HTML and CSS for the homepage of the website and the navigation bar of the website. Front-end and back-end coding (ts, HTML) on word CRUD. Heroku deployment,CRUD pronu and modify.  Implemented back-end functions for APIs: signup, login, changeinfo, mainview. Implemented all front-end functions for user sign in and sign up. Implemented the front-end html for main page.

## Conclusion ##
The team found that the design and implementation process was challenging but doable. We learned a lot through the design and implementation process because most of us had no experience in html, css, javascript, and typescript. We had experience in database queries because we took Compsci 345 but did not know how to integrate a SQL database to our backend. The in-class exercises were very helpful starters to implement our PCRUD server and SQL database queries. Some challenges we faced were deploying everything on Heroku and getting our server to connect up with our data model with the user interface.  





