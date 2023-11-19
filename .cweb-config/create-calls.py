import yaml
from yamlinclude import YamlIncludeConstructor
from pathlib import Path

workdir_path = Path(__file__).parent / "../"
print("workdir_path: ", workdir_path)
YamlIncludeConstructor.add_to_loader_class(loader_class=yaml.FullLoader, base_dir=workdir_path)

path = Path(__file__).parent / "calls-template.yaml"
with path.open() as template:
    data = yaml.load(template, Loader=yaml.FullLoader)

path = Path(__file__).parent / "calls.yaml"
with path.open('w') as calls:
    yaml.dump(data, calls, default_flow_style=False)
