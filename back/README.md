env info:
PORT=3001
JWT_SECRET=MEGAGIGA
JWT_EXPIRES=300d

Query to create postgreSQL database:
1. register new user: name, lastname, email, password.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

2. create recipe database
-- Create Categories Table
CREATE TABLE Categories (
    CategoryID SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL UNIQUE
);

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
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (CuisineID) REFERENCES Cuisines(CuisineID) ON DELETE SET NULL ON UPDATE CASCADE
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
INSERT INTO Categories (Name) VALUES ('drinks'), ('dessert'), ('appetiser'), ('main_dish');

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





