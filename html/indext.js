<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="client-main.js"></script>
    <!-- <link rel="stylesheet" type="text/css" href="index.css"> -->
    <title>Word Collection</title>
  </head>
  <body>
    <div>
        <div class="text-center">
            <h2>Online Dialect Dictionary</h2>      
            <p>For Share And Love</p>
          </div>
          
      </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="">Home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <!-- <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li> -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Info
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Upload new dialect</a>
                <a class="dropdown-item" href="#">My collection</a>
                <!-- <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a> -->
              </div>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li> -->
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          
          <ul class="dropdown my-2">
            <a class="nav-link dropdown-toggle" href="#" id="userdroplist" role="button" data-toggle="dropdown">John</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">new Upload</a>
              <a class="dropdown-item" href="#">My collection</a>
             <div class="dropdown-divider"></div>
             <a class="dropdown-item" href="#">log out</a>
            </div>
             </ul>
            </div>
      </nav>
    
      <div class="container h-50">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active"  href="#firsttab" data-toggle="tab">Upload Word</a>
          </li>
          <li class="nav-item">
            <a class="nav-link "  href="#secondtab" data-toggle="tab">Update Definition</a>
          </li>
          <li class="nav-item">
            <a class="nav-link "  href="#thirdtab" data-toggle="tab">Delete Word</a>
          </li>
          <li class="nav-item">
            <a class="nav-link "  href="#forthtab" data-toggle="tab">Browse your Word</a>
          </li>

          <li class="nav-item">
            <a class="nav-link "  href="#fifthtab" data-toggle="tab">Get Definition By Language</a>
          </li>
          
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="firsttab">
            
              <header class="center">
                <h2>Upload the word</h2>
            </header>
            <div class="justify-content-center align-items-center  align-items-center">
            <div class = "row"> 
              <form class="md-form">
                <div class="file-field">
                  <div class="z-depth-1-half">
                    <p id='word_img'>
                    <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"  class="img-fluid rounded" style= "width:200px; height:200px"alt="example placeholder">
                    </p>
                  </div>
                </div>
                  <div class="d-flex justify-content-center">
                    <!-- available after new file can be imported-->
                    <!-- <label for='wordimg'>Upload img</label> -->
                    <div class="btn btn-mdb-color btn-rounded float-left">
                        <!-- <input type="file" id='image' name='wordimg'> -->
                    </div>
                  </div>
              </form>
            </div>
           
            <div class = "col-sm-4">
              <div class="input-group input-group-sm ">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">word</span>
                </div>
                <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder = "Word" id = "word">
              </div>
  
            </div>
           
            <div class = "col-sm-4">
              <div class="input-group input-group-sm ">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">image</span>
                </div>
                <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder = "link like:img/png" id = "img">
              </div>
            </div>
       

            <div class="input-group input-group-sm ">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">languages</span>
              </div>
              <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id = "languages">
            </div>

            <div class="input-group input-group-sm ">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">definition</span>
              </div>
              <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id = "definition">
            </div>
            

            <button onclick="client.wordCreate()" class="btn btn-primary">Submit</button>
            <header>Create Output:</header>
            <div class="col">
              <p id="output" style="font-size: xx-large;">
                <small style="font-size: small;"></small>
              </p>
            </div>
          </div>
        </div><br>
          
        <div class="tab-pane" id="secondtab">
          <div class="justify-content-center align-items-center">
            <header>
              <h2>Add definition to the word</h2>
          </header>
          <div class="input-group input-group-sm ">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">word</span>
            </div>
            <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id = word_update>
          </div>
          <div class="input-group input-group-sm ">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">languages</span>
            </div>
            <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id = languages_update>
          </div>
          <div class="input-group input-group-sm ">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">definition</span>
            </div>
            <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id = definition_update>
          </div>
          <button onclick="client.wordUpdate()" class="btn btn-primary">Submit</button>
          <header>Update Output:</header>
          <div class="col">
            <p id="output_update" style="font-size: xx-large;">
              <small style="font-size: small;"></small>
            </p>
          </div>
        </div>
      </div>

          <div class="tab-pane" id="thirdtab">
            <div class="justify-content-center align-items-center">
              <header>
                <h2>Delete the word</h2>
            </header>
            <div class="input-group input-group-sm ">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">word</span>
              </div>
              <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id = word_delete>
            </div>
            <button onclick="client.wordDelete()" class="btn btn-primary">Submit</button>
            <header>Delete Output:</header>
            <div class="col">
              <p id="output_delete" style="font-size: xx-large;">
                <small style="font-size: small;"></small>
              </p>
            </div>
          </div>
          </div>

          <div class="tab-pane" id="forthtab">
            <div class="justify-content-center align-items-center">
              <header>
                <h2>Browse your word</h2>
            </header>
            <div class="input-group input-group-sm ">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">word</span>
              </div>
              <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id = word_read>
            </div>
            <button onclick="client.wordRead()" class="btn btn-primary">Submit</button>
            <header>Read Output:</header>
            <div class="col">
              <p id="output_get" style="font-size: xx-large;">
                <small style="font-size: small;"></small>
              </p>
              <p id="output_get_img" style="font-size: xx-large;">
                <small style="font-size: small;"></small>
              </p>
            </div>
          </div>
          </div>

          <div class="tab-pane" id="fifthtab">
            <div class="justify-content-center align-items-center">
              <header>
                <h2>Get definition of the word</h2>
            </header>
            <div class="input-group input-group-sm ">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">word</span>
              </div>
              <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id = word_getdef>
            </div>
            <div class="input-group input-group-sm ">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">languages</span>
              </div>
              <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id = languages_getdef>
            </div>
            <button onclick="client.defRead()" class="btn btn-primary">Submit</button>
            <header>Definition Output:</header>
            <div class="col">
              <p id="output_getdef" style="font-size: xx-large;">
                <small style="font-size: small;"></small>
              </p>
            </div>
          </div>
       </div>

       
        

  </body>
</html>