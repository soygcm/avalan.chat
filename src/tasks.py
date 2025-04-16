from dotenv import load_dotenv, find_dotenv

from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core import Settings
import logging
import sys
from Task import Album, Task

load_dotenv(find_dotenv())
logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))


llm = OpenAI(model="gpt-4o", system_prompt="Siempre responde en español.")
embed_model = OpenAIEmbedding(model="text-embedding-3-small")
Settings.llm = llm
Settings.embed_model = embed_model

from llama_index.core.llms import ChatMessage

structured_llm = llm.as_structured_llm(output_cls=Task)
input_msg = ChatMessage.from_str("Haz una lista de 5 tareas para poder resolver 'Comprar carro nuevo' en donde cada tarea es en realidad una categoría para organizar tareas adentro")

output = structured_llm.chat([input_msg])
# get actual object
output_obj = output.raw
print(str(output))
print(output_obj)

# https://docs.llamaindex.ai/en/stable/examples/output_parsing/function_program/