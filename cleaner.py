import shutil


def clean():
    shutil.rmtree("build")
    shutil.rmtree("types")
    shutil.rmtree("node_modules")


if __name__ == "__main__":
    clean()
