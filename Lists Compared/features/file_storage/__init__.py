import pandas as pd
from features.utils import orange, red


def file_exists(file_name):
    """
        -> Checks if the txt file already exists.
    :param file_name: name of the file to be checked.
    :return: returns True if the file exists and False otherwise.
    """
    try:
        a = open(file_name, 'rt')  # Opens the file in read mode
        a.close()  # Closes the file
    except FileNotFoundError:  # Error finding the file
        return False
    else:
        return True


def create_file(file_name):
    """
        -> Creates a txt file with UTF-8 encoding.
    :param file_name: name of the file.
    """
    try:
        # Opens and closes the file in write mode with UTF-8 encoding
        with open(file_name, 'w', encoding="utf-8") as a:
            a.write('Product,Qty\n')  # When the file is created, write the headers
        print(f'File {file_name} created successfully!')

    except Exception as e:
        print(f'Error creating file: {e}')


def show_table(file_name):
    """
        -> Reads the file and shows a simple table with the data.
    :param file_name: name of the file to be read.
    """
    try:
        # Opens and closes the file in read mode with UTF-8 encoding
        with open(file_name, 'r', encoding='utf-8') as a:
            lines = a.readlines()  # Reads each line of the file returning a list of strings

        if len(lines) <= 1:  # If the file has no lines or only the header line
            print('The shopping list is empty.')
            return

        # Generate a simple table with the file content
        table = pd.read_csv(file_name, delimiter=',', encoding="utf-8")
        table.index = table.index + 1  # Indices start from 1
        print(table)

    # Possible errors
    except FileNotFoundError:
        print('Error finding the file!')
    except UnicodeDecodeError:
        print('Encoding error!')
    except Exception as e:
        print(f'Error reading the file: {e}')


def add_items(file_name, item, qty):
    """
        -> Adds the item and quantity, entered by the user, to the list.
    :param file_name: name of the file where it will be added.
    :param item: item to be added.
    :param qty: quantity of the item.
    """
    try:
        # Opens and closes the file in append mode with UTF-8 encoding
        with open(file_name, 'a', encoding='utf-8') as a:
            a.write(f'{item},{qty}\n')  # Writes the item and quantity to the file
            print(f'\033[{orange}mItem "{item}" added successfully!\033[m')

    except Exception as e:
        print(f'Error adding item: {e}')


def delete_item(file_name, index):
    """
        -> Deletes the item at the given index from the txt file.
    :param file_name: name of the file containing the list.
    :param index: index of the item to be deleted.
    """
    # Reads all lines from the file
    with open(file_name, 'r', encoding='utf-8') as a:
        lines = a.readlines()

    # Checks if the line number is valid
    if index < 1 or index > len(lines) - 1:
        print(f'\033[{red}mThis index does not exist!\033[m')
        return

    # Removes the line at the index provided by the user
    del lines[index]

    # Rewrites the lines and shows the updated table
    with open(file_name, 'w', encoding='utf-8') as a:
        a.writelines(lines)
    print(f'\033[{orange}mItem removed successfully!\033[m')
    show_table(file_name)
