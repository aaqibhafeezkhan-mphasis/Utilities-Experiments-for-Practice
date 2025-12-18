
red = '31'
purple = '35'
cyan = '36'
orange = '34'
yellow = '33'
green = '32'
pink = '31'
white = '97'
black = '30'
gray = '37'


def title(msg, size=42, symbol='-', color=red):
    """
        -> Creates a title with the specified size, symbol, and color.
    :param msg: the text to be displayed as a title.
    :param size: title size - default: 42
    :param symbol: symbol to decorate the title - default: '-'
    :param color: title color - default: red - available: red, purple, cyan, orange, yellow, green, pink,
    white, black, and gray.
    """
    print(f'\033[{color}m{symbol}\033[m' * size)
    print(f'\033[{color}m{msg.center(size * len(symbol))}\033[m')
    print(f'\033[{color}m{symbol}\033[m' * size)


def read_int(msg):
    """
        -> Only allows integer input.
    :param msg: message displayed in the input.
    :return: returns the typed integer.
    """
    while True:
        try:
            num = int(input(msg))
        except (ValueError, TypeError):  # If value or type error
            print('\033[0;31mERROR! Please enter a valid integer.\033[m')
            continue  # will keep asking the user.
        else:
            return num
