Vale.com
========

Mais uma página da `Vale.com`.

## Dependências

Esta página depende das tecnologias abaixo para seu **desenvolvimento**:

- Node.js
- NPM
- RequireJs
- Volo
- Bower
- Grunt
- Ruby
- Sass e Compass

## Instalação

Instalando as dependências e efetuando as configurações para o **desenvolvimento**.

    gem install compass
    npm install -g requirejs
    npm install -g volo
    npm install -g bower
    npm install -g grunt-cli

    git clone git@git.tribointeractive.com.br:vale-com/projeto.git projeto
    cd projeto
    npm install -d

## Desenvolvimento

Para trabalhar no projeto, você deverá fazer o seguinte:

- Execute o `grunt server`.
- Adicione o diretório do projeto no seu editor e comece a trabalhar.

Segue abaixo a árvore com os diretórios **importantes** para o desenvolvimento:

        projeto
           |-dev
           |---Documents
           |-----app
           |-------css
           |-------fonts
           |-------js
           |---------app
           |-----------nls
           |-------------es-es
           |-------------pt-br
           |-------------root
           |-----------templates
           |---------lib
           |-sass
           |---add-ons
           |---app
           |---vendor
           |-template
           |-tools

## Build

Execute o comando `grunt build` para gerar os arquivos de publicação no diretório `build`.

## <a name="publicacao"></a>Publicação

**Obs.:** o path do `Share Point` é apenas um exemplo.

Acesse o diretório `build/Documents` e copie o diretório `app` para dentro do diretório `Documents` no **gerenciador de arquivos** do `Share Point`.

### Via iframe

No `Editor de conteúdo` adicione via código fonte o seguinte:

    <iframe scrolling="no" frameborder="0" src="/gbl/global/pagina/Documents/app/index.html" width="100%"></iframe>​​

### Via editor de conteúdo

Adicione um nova `Web Part` -> `Mídia e Conteúdo` -> `Editor de conteúdo`.

Na `WebPart Zone`, clique no bullet na direita da sua `Web Part` e selecione `Editar Web Part`.

Dentro do box(`Editar Web Part`) ache item `Link de Conteúdo` coloque:

    /gbl/global/pagina/Documents/app/app.txt

## Problemas com cache

Desenvolvi um `workaround` para evitar o **cache** quando for publicar uma atualização do projeto.

No arquivo `Gruntfile.js`, na linha 9, tem a variável `pathFinal` que será o nosso controle de versão.

**Por exemplo:**

Definimos que o `pathFinal` será `/gbl/global/pagina/Documents/app-1/`.
Então execute o `grunt build`, faça o upload normalmente, como descrito no item [Publicação](#publicacao), e renomeie o diretório para `app-1`.

## Contribuição

- [Thiago Lagden](https://twitter.com/thiagolagden)