import json
from pathlib import Path
import subprocess
import sys
import unittest
from anime_prompt_kit import compose_prompt, from_template, list_templates


class PromptTests(unittest.TestCase):
    def test_shared_templates(self):
        root = Path(__file__).resolve().parents[1]
        self.assertEqual(list_templates(), json.loads((root / "templates.json").read_text()))
        self.assertEqual(len(list_templates()), 12)
        for template in list_templates():
            js = subprocess.check_output(["node", "cli.js", template["id"], "--setting", "a snowy station"], cwd=root, text=True).strip()
            self.assertEqual(from_template(template["id"], setting="a snowy station"), js)

    def test_overrides_do_not_mutate(self):
        original = from_template("sky-courier")
        self.assertIn("a snowy station", from_template("sky-courier", {"setting": "a snowy station"}))
        self.assertEqual(from_template("sky-courier"), original)
        items = list_templates()
        items[0]["subject"] = "changed"
        self.assertEqual(from_template("sky-courier"), original)

    def test_validation(self):
        self.assertEqual(compose_prompt(subject="  explorer  ", outfit="  ", setting="forest"), "explorer, forest")
        for value in ([], 1, "text"):
            with self.assertRaises(TypeError):
                compose_prompt(value)
        with self.assertRaises(TypeError):
            compose_prompt(subject=None)
        with self.assertRaises(ValueError):
            from_template("missing")

    def test_cli_errors(self):
        for args in (["missing"], ["sky-courier", "--unknown", "x"], ["--list", "sky-courier"]):
            result = subprocess.run([sys.executable, "-m", "anime_prompt_kit", *args], capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertNotIn("Traceback", result.stderr)
