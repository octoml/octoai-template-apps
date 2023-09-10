"""Model wrapper for serving clip_vit_l_14."""

import argparse
import typing

import torch
from base64 import b64decode
from io import BytesIO
from PIL import Image
from clip_interrogator import Config, Interrogator



class Model:
    """Wrapper for CLIP interrogator model."""

    def __init__(self):
        """Initialize the model."""
        self._clip_interrogator = Interrogator(Config(
                clip_model_name="ViT-L-14/openai",
                clip_model_path='cache',
                device="cuda:0" if torch.cuda.is_available() else "cpu"))

    def predict(self, inputs: typing.Dict[str, typing.Any]) -> typing.Dict[str, str]:
        """Return interrogation for the given image.

        :param inputs: dict of inputs containing model inputs
               with the following keys:

        - "image" (mandatory): A base64-encoded image.

        :return: a dict containing these keys:

        - "labels": String containing the labels.
        """

        image = inputs.get("image", None)
        image_bytes = BytesIO(b64decode(image))
        image_dat = Image.open(image_bytes).convert('RGB')
        outputs = self._clip_interrogator.interrogate_fast(image_dat)

        response = {"completion": {"labels": outputs}}

        return response


    @classmethod
    def fetch(cls) -> None:
        """Pre-fetches the model for implicit caching by Transfomers."""
        # Running the constructor is enough to fetch this model.
        cls()

def main():

    """Entry point for interacting with this model via CLI."""
    parser = argparse.ArgumentParser()
    parser.add_argument("--fetch", action="store_true")
    args = parser.parse_args()

    if args.fetch:
        Model.fetch()

if __name__ == "__main__":
    main()

