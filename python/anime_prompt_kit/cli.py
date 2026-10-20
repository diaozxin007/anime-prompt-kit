"""Command-line prompt composer."""
import argparse
from . import FIELDS, __version__, from_template, list_templates


def main(argv=None):
    parser = argparse.ArgumentParser(description="Compose anime prompts locally; no API key required.")
    parser.add_argument("template", nargs="?")
    parser.add_argument("--list", action="store_true", help="List available templates")
    parser.add_argument("--version", action="version", version=__version__)
    for field in FIELDS:
        parser.add_argument(f"--{field}")
    args = parser.parse_args(argv)
    overrides = {key: getattr(args, key) for key in FIELDS if getattr(args, key) is not None}
    if args.list:
        if args.template or overrides:
            parser.error("--list cannot be combined with a template or overrides")
        for item in list_templates():
            print(f"{item['id']}: {item['name']}")
        return 0
    if not args.template:
        if overrides:
            parser.error("a template is required with field overrides")
        parser.print_help()
        return 0
    try:
        print(from_template(args.template, overrides))
    except (ValueError, TypeError) as error:
        parser.error(str(error))
    return 0
