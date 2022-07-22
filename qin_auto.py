import shutil
import sys
import urllib.request


def download(origin: str, destiny: str):
    with urllib.request.urlopen(origin) as resp, open(destiny, 'wb') as file:
        shutil.copyfileobj(resp, file)


def automagic():
    pass


if __name__ == "__main__":
    automagic()
else:
    sys.modules[__name__] = automagic
