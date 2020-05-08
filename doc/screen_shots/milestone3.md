 Project Milestone 3 Assignment #
## Team He ##
## Application: Dialect Dictionary ##
## Team Overview ##
Zipei Jiang github: zipeijiang

Haoqin Liang github: Leonalhq & Leonalhqkun

Addis Gunst github: AddieGunst
## SQL Documentation##

    userinfo document
    {
        id INT PRIMARY KEY, //unique key
        username varchar(100),  
        password varchar(100), 
        portrait varchar(10),
        registered_at DATE, //registered time
        location varchar(100)
    }

    

    userinfo table

    | Column       | Data Type | Description              |
    |--------------|-----------|--------------------------|
    | id           | String    | The id of the user   |
    | username     | string    | The username of user |
    | password     | string    | The user password    |
    | portrait     | string    | The src of the portrait|
    |registered_at |string     |data of the registered|
    |location      | string    | place the uer sign in|

    wordTable document
    {
        word VARCHAR(50) PRIMARY KEY,
        img VARCHAR(200),
        languages VARCHAR(200)
        views INTEGER DEFAULT 0
    }

    wordTable table

    | Column        | Data Type | Description          |
    |---------------|-----------|----------------------|
    | word          | String    | The word in English   |
    | img           | string    | URL to the image descripes the word |
    | languages     | string    | All languages the word has a definition    |
    | views         | integer   | The number of time the word is viewed, initialized as 0|

    comment  document
    {
        id  SERIAL NOT NULL PRIMARY KEY,
        pronunID INTEGER REFERENCES pronTable(id) ON DELETE CASCADE,
        userID VARCHAR(50),
        text varchar(250),
        date TIMESTAMP
    }

    comment table

    | Column       | Data Type | Description              |
    |--------------|-----------|--------------------------|
    | id           | integer   | Automatically generated unique id   |
    | pronunID     | string    | the id of pronunciation the comment comment on |
    | userID       | string    | the userid of uploader    |
    | text         | string    | the text of the document|
    | date         |string     | the time the comment is posted|

    pronTable document
    {
        id serial NOT NULL PRIMARY KEY, 
        word VARCHAR(50) REFERENCES wordTable(word) ON DELETE CASCADE, 
        userID VARCHAR(50), 
        pronunciation VARCHAR(200), 
        address VARCHAR(200), 
        likes integer
    }

    | Column       | Data Type | Description              |
    |--------------|-----------|--------------------------|
    | id           | integer   | Automatically generated unique id    |
    | word         | string    | the word the pronunciation descripes |
    | userID       | string    | the userid of uploader        |
    | pronunciation| string    | the address of the audio file |
    | address      | string    | the location of the dialect   |
    | likes        |number     | the number of likes added by users   |

## Division of Labor ##
Addis Gunst : Implemented back-end functions for APIs: addpronunciation, getpronunciation, addPronunLikes, deletePronun. Implemented front-end functions to add pronunciation in upload.html, add likes to pronunciation and delete pronunciation in wordPage.html
Haoqin Liang : Implemented back-end functions for APIs: signup, login, changeinfo, mainview. Implemented all front-end functions for user sign in and sign up. Implemented the front-end html for main page.
Zipei Jiang : Implemented back-end functions for APIs: addcomment, delcomment, getcomment. Implemented front-end functions to load word/pronunciation information to wordPage.html, functions to retrieve/add definitions to word in wordPage.html, functions to get/add comments.