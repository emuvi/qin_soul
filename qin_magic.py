import os
import shutil
import sys
import urllib.request


def automagic():
    print("Automagic...")
    if os.path.exists("package.json"):
        app_automagic()


def app_automagic():
    print("Configuring an application...")
    download("https://github.com/emuvi/qin_soul/raw/refs/heads/master/builder.py", "builder.py")
    download("https://github.com/emuvi/qin_soul/raw/refs/heads/master/cleaner.py", "cleaner.py")
    download("https://github.com/emuvi/qin_soul/raw/refs/heads/master/mk_all.py", "mk_all.py")
    download("https://github.com/emuvi/qin_soul/raw/refs/heads/master/packer.py", "packer.py")
    download("https://github.com/emuvi/qin_soul/raw/refs/heads/master/put_on.py", "put_on.py")
    app_name = get_app_name()
    app_mk_put_mode(app_name, 'TEST')
    app_mk_put_mode(app_name, 'PROD')


def app_mk_put_mode(app_name: str, mode: str):
    kind = 'PUB'
    folder_name = get_folder_name()
    if folder_name.startswith("qia_"):
        kind = "APP"
    source = f"""import put_on

put_on.install("{app_name}", put_on.Mode.{mode}, put_on.Kind.{kind})
"""
    with open('put_' + mode.lower() + ".py", 'w') as file:
        file.write(source)


def get_app_name() -> str:
    with open("package.json") as file:
        package = file.read()
        name_at = package.find('"name":')
        if name_at == -1:
            return ""
        open_at = package.find('"', name_at + 7)
        if open_at == -1:
            return ""
        close_at = package.find('"', open_at + 1)
        if close_at == -1:
            return ""
        return package[open_at+1:close_at]


def get_folder_name() -> str:
    return os.path.basename(os.getcwd())


def download(origin: str, destiny: str):
    with urllib.request.urlopen(origin) as resp, open(destiny, 'wb') as file:
        shutil.copyfileobj(resp, file)


if __name__ == "__main__":
    automagic()
