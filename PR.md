
# Modificações do dataset

- Transformação da Estrutura Principal:O conjunto de dados original, que era um dicionário de edições, foi convertido numa lista de objetos. Cada objeto nesta lista representa uma edição individual do festival.
- Identificador Único para Edições (`_id`): A chave de cada edição no dicionário original (p. ex., "ed1956") foi movida para dentro do objeto da respetiva edição, passando a ser o valor do campo `_id`. Este formato é ideal para o MongoDB.
- Identificador Único para Músicas (`_id`): De forma semelhante, os identificadores únicos de cada música (p. ex., "m1956\_Switzerland"), que poderiam estar presentes no dataset original, foram também padronizados para um campo `_id` dentro de cada objeto de música.
- Normalização de Nomes de Campos: Campos que continham caracteres especiais ou acentuação (como `anoEdição`, `título`, `país`) foram renomeados para versões sem esses caracteres (p. ex., `anoEdicao`, `titulo`, `pais`)
- Tratamento de Campos Opcionais Ausentes: Campos que poderiam estar ausentes em algumas entradas (como `vencedor` numa edição, ou `compositor` e `letra` numa música) foram explicitamente definidos com o valor `null` no JSON processado.
- Filtragem de Entradas de Músicas Incompletas: removidas entradas de músicas que estavam malformadas ou incompletas dentro dos arrays `musicas`. Foram mantidas apenas as músicas que possuíam informações de identificação essenciais, como um ID, título e país.

# Comandos de importação para o mongo

- sudo docker cp dataset_processed.json mongoEW:/tmp/dataset_processed.json
- sudo docker exec mongoEW mongoimport --db eurovisao --collection edicoes --file /tmp/dataset_processed.json --jsonArray

# Comandos de execução das apps

## Api

- npm i
- npm start

## Interface

- npm i
- nmp start
  