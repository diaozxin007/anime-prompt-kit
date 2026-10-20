"""Compose anime character prompts locally, without network access."""
import json
from importlib.resources import files
from collections.abc import Mapping

__version__ = "0.1.0"
FIELDS = ("subject", "outfit", "action", "setting", "style", "lighting", "composition")


def list_templates():
    """Return fresh template dictionaries; callers cannot mutate stored templates."""
    return json.loads(files(__package__).joinpath("templates.json").read_text(encoding="utf-8"))


def compose_prompt(options=None, **fields):
    """Join nonempty fields in a stable order. Keyword arguments override options."""
    if options is None:
        options = {}
    if not isinstance(options, Mapping):
        raise TypeError("Expected a prompt options mapping")
    values = dict(options, **fields)
    for key in FIELDS:
        if key in values and not isinstance(values[key], str):
            raise TypeError(f"{key} must be a string")
    return ", ".join(values.get(key, "").strip() for key in FIELDS if values.get(key, "").strip())


def from_template(template_id, overrides=None, **fields):
    """Compose a named template, replacing any supplied fields."""
    if overrides is None:
        overrides = {}
    if not isinstance(overrides, Mapping):
        raise TypeError("Expected an overrides mapping")
    template = next((item for item in list_templates() if item["id"] == template_id), None)
    if template is None:
        raise ValueError(f"Unknown template: {template_id}. Use --list to see available templates.")
    return compose_prompt(dict(template, **overrides), **fields)
