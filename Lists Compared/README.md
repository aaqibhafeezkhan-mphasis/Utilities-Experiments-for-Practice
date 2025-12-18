# 🛒 Shopping List
📚 School supplies shopping list project
---
 - As soon as the program starts, it checks if the *.txt* file containing the list already exists. If it doesn't, the file is created. If it does, the program proceeds normally.
 
 - The project has a menu with the following options:
1. **Add items to list** (the user provides the product name and quantity, and the information is inserted into the .txt file)
2. **View list** (displays a table containing the indices of each product, product names, and quantity of each)
3. **Remove item** (removes the item based on the index provided by the user)
4. **Exit** (the program terminates).
***
🛠️ The language used was Python, applying concepts such as: while, match/case, if/else, with. In addition, functions were used to make the code more practical, which are inside the Features Package. Error handling was performed with the concepts of try/except/else.

🐼 The Pandas library was imported into the project to display a simple table with indices, products, and quantities of products in the list, always updated by the user.

## How to Run

1.  **Clone the repository** (or navigate to the project folder).
2.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Run the application**:
    ```bash
    python main.py
    ```

📌 Updates
---
Now, the project has a branch called *"csv-version"*. In it, the following changes occur:
- The file is created directly in *csv* format
- The **csv** library is used with features such as *csv.reader* and *csv.writer* to manipulate the file
- The **pandas** library was used to create a dataframe from the csv file with *pd.read_csv* and transform this csv file into *.xlsx*, i.e., save in Excel compatible format using *to_excel*
