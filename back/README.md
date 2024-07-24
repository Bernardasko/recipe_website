env info:
PORT=3001
JWT_SECRET=MEGAGIGA
JWT_EXPIRES=300d

Query to create postgreSQL database:
--1. register new user: name, lastname, email, password.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL, 
    role VARCHAR(50)
);

--2. create recipe database
-- Create Categories Table
CREATE TABLE Categories (
    CategoryID SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL UNIQUE
);
ALTER TABLE categories ADD CONSTRAINT unique_category_name UNIQUE (name);

-- Create Cuisines Table
CREATE TABLE Cuisines (
    CuisineID SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL UNIQUE
);

-- Create Ingredients Table
CREATE TABLE Ingredients (
    IngredientID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL UNIQUE
);

-- Create Recipes Table
CREATE TABLE Recipes (
    RecipeID SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    CategoryID INT,
    CuisineID INT,
    UserID INT,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID),
    FOREIGN KEY (CuisineID) REFERENCES Cuisines(CuisineID),
    FOREIGN KEY (UserID) REFERENCES Users(id)
);


-- Create Recipe Steps Table
CREATE TABLE Recipe_Steps (
    StepID SERIAL PRIMARY KEY,
    RecipeID INT,
    StepNumber INT NOT NULL,
    Description TEXT NOT NULL,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Recipe Ingredients Table
CREATE TABLE Recipe_Ingredients (
    RecipeID INT,
    IngredientID INT,
    Amount VARCHAR(50),
    PRIMARY KEY (RecipeID, IngredientID),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Images Table
CREATE TABLE Images (
    ImageID SERIAL PRIMARY KEY,
    RecipeID INT,
    ImageURL TEXT,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert the allowed categories
INSERT INTO Categories (Name) VALUES ('drinks'), ('dessert'), ('appetiser'), ('main dish');

-- Insert the optional cuisines
INSERT INTO Cuisines (Name)
VALUES 
('italian'),
('chinese'),
('indian'),
('mexican'),
('japanese'),
('french'),
('thai'),
('spanish'),
('greek'),
('mediterranean'),
('korean'),
('vietnamese'),
('turkish'),
('moroccan'),
('lebanese'),
('brazilian'),
('argentinian'),
('peruvian'),
('ethiopian'),
('caribbean'),
('german'),
('russian'),
('polish'),
('cuban'),
('swedish'),
('portuguese'),
('malaysian'),
('filipino'),
('indonesian'),
('pakistani'),
('persian'),
('american'),
('british'),
('irish'),
('australian'),
('nigerian'),
('south african'),
('hungarian'),
('dutch'),
('belgian'),
('austrian'),
('swiss'),
('chilean'),
('colombian'),
('venezuelan'),
('uruguayan'),
('ecuadorian'),
('bolivian'),
('paraguayan'),
('czech'),
('slovak'),
('romanian'),
('bulgarian'),
('croatian'),
('serbian'),
('bosnian'),
('slovenian'),
('macedonian'),
('albanian'),
('georgian'),
('armenian'),
('azerbaijani'),
('kazakh'),
('uzbek'),
('turkmen'),
('kyrgyz'),
('tajik'),
('nepalese'),
('sri lankan'),
('bangladeshi'),
('afghan'),
('saudi'),
('emirati'),
('qatari'),
('kuwaiti'),
('omani'),
('yemeni'),
('jordanian'),
('palestinian'),
('israeli'),
('syrian'),
('iraqi'),
('libyan'),
('algerian'),
('tunisian'),
('sudanese'),
('kenyan'),
('tanzanian'),
('ugandan'),
('ghanaian'),
('senegalese'),
('ivorian'),
('cameroonian'),
('angolan'),
('zimbabwean'),
('zambian'),
('malawian'),
('botswanan'),
('mozambican'),
('namibian'),
('lithuanian'),
('scandinavian'),
('baltic'),
('middle eastern'),
('central american'),
('east african'),
('west african'),
('southern african'),
('central asian'),
('south asian'),
('southeast asian'),
('east asian'),
('central european'),
('eastern european'),
('western european'),
('southern european');











££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££




CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50)
);

CREATE TABLE Categories (
    CategoryID SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Cuisines (
    CuisineID SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Ingredients (
    IngredientID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Recipes (
    RecipeID SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    CategoryID INT,
    CuisineID INT,
    UserID INT,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID),
    FOREIGN KEY (CuisineID) REFERENCES Cuisines(CuisineID),
    FOREIGN KEY (UserID) REFERENCES Users(id)
);

CREATE TABLE Recipe_Steps (
    StepID SERIAL PRIMARY KEY,
    RecipeID INT,
    StepNumber INT NOT NULL,
    Description TEXT NOT NULL,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Recipe_Ingredients (
    RecipeID INT,
    IngredientID INT,
    Amount VARCHAR(50),
    PRIMARY KEY (RecipeID, IngredientID),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Images (
    ImageID SERIAL PRIMARY KEY,
    RecipeID INT,
    ImageURL TEXT,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create the comments table
CREATE TABLE comments (
    commentid SERIAL PRIMARY KEY,
    recipeid INT NOT NULL,
    userid INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipeid) REFERENCES recipes(recipeid) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the ratings table with updated constraints
CREATE TABLE ratings (
    ratingid SERIAL PRIMARY KEY,
    recipeid INT NOT NULL,
    userid INT NOT NULL,
    rating NUMERIC(2, 1) CHECK (rating IN (0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    commentid INT,
    FOREIGN KEY (recipeid) REFERENCES recipes(recipeid) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (commentid) REFERENCES comments(commentid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS followers (
  user_id INT NOT NULL,
  follower_id INT NOT NULL,
  followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, follower_id),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (follower_id) REFERENCES users (id) ON DELETE CASCADE
);
