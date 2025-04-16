from dotenv import find_dotenv, load_dotenv
from llama_index.core import Settings
from llama_index.llms.openai import OpenAI
from llama_index.core import StorageContext, load_index_from_storage
import logging
import sys

load_dotenv(find_dotenv())

# Configurar el logging para mostrar mensajes de depuración
# logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
# logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))


# rebuild storage context
storage_context = StorageContext.from_defaults(persist_dir="./storage")
# load index
llm = OpenAI(system_prompt="Siempre responde en español.")
Settings.llm = llm
index = load_index_from_storage(storage_context)

query_engine = index.as_query_engine()
response = query_engine.query("Cómo dirías que Vale es? cual es su personalidad?")
print(response)