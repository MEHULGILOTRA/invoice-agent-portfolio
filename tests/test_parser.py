import json
import pytest

def test_sample_invoice_parsing():
    # This is a placeholder test
    with open("output/invoice.json") as f:
        data = json.load(f)
    assert "vendor" in data or "raw" in data
