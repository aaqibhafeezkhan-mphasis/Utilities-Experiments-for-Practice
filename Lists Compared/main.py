from features.utils import *
from features.file_storage import *

# Text file name
file_name = 'list.txt'

if not file_exists(file_name):  # If the file does not exist, it is created
    create_file(file_name)

title('SCHOOL SUPPLIES LIST', 42, '=-', green)
# While the Exit option is not chosen, the loop continues
while True:
    title('MENU', 42, '-', cyan)
    print(f'\033[{orange}m1 - Add items to list / 2 - View list / 3 - Remove item / 4 - Exit\033[m')
    
    # Asks the user to enter an option until it is valid (integer and within available options)
    while True:
        choice = read_int('>> Your choice: ')
        if choice in range(1, 5):
            break
        else:
            print('\033[0;31mPlease enter a valid option! [1, 2, 3 or 4]\033[m')
            
    # Each option is a different case
    match choice:
        case 1:  # Add items
            while True:
                item = str(input('>> Item: ')).strip()
                qty = read_int('>> Quantity: ')
                add_items(file_name, item, qty)
                while True:
                    continue_adding = str(input('>> Do you want to add more items? [Y/N]: ')).upper().strip()[0]
                    if continue_adding in 'YN':
                        break
                    print(f'\033[{red}mType Y - yes or N - no!\033[m')
                if continue_adding == 'N':
                    break
        case 2:  # View items
            show_table(file_name)
        case 3:  # Remove items
            index_to_delete = int(input('>> Enter the index of the item you want to delete: '))
            delete_item(file_name, index_to_delete)
        case 4:  # Exit
            break

print(f'\033[{orange}mList Finished!\033[m')
title('HAPPY SHOPPING!', 42, '=-', green)
