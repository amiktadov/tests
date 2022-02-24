# from bs4 import BeautifulSoup
# import requests


# def func_list(iter):
#     results = []
#     for item in iter:
#         text = item.text.replace('"', "'")
#         eval(f'results.append("{text}")')
#     return results


# page = 59
# url = f'https://ru.inshaker.com/ratings?page={page}'
# response = requests.get(url)
# soup = BeautifulSoup(response.text, 'lxml')

# file = open('cocktail_data.py', 'w')
# file.write('cocktails = {\n')

# cocktail_items = soup.find_all('div', class_='cocktail-item')

# for cocktail_item in cocktail_items:
#     cocktail_name = cocktail_item.find('div', class_='cocktail-item-name').text
#     ingridients = cocktail_item.find_all('div', class_='cocktail-item-good-name')
#     file.write(f'    "{cocktail_name}":{func_list(ingridients)},\n')

# file.write('}')
# file.close()


from cocktail_data import cocktails



ingridients = []
for cocktail in cocktails:
    print(cocktail)
    print(cocktails.get(cocktail))





























