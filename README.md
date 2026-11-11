# Minha Wiki

Wiki pessoal feita com MkDocs.

O conteúdo original desta wiki é disponibilizado sob a licença **CC BY 4.0**
(consulte [LICENSE](./LICENSE)). Materiais de terceiros podem estar sujeitos
a licenças próprias.

## Preparar o ambiente (Windows)

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

## Escrever e visualizar

Adicione arquivos Markdown em `docs/`. O MkDocs monta a navegação a partir dos
arquivos nessa pasta.

```powershell
mkdocs serve
```

Abra o endereço exibido no terminal para visualizar as alterações. Para gerar
o site localmente:

```powershell
mkdocs build
```

## Publicar no GitHub Pages

O workflow em `.github/workflows/deploy.yml` publica o site ao enviar alterações
para a branch `main`. No repositório do GitHub, configure **Settings > Pages >
Build and deployment > Source** como **GitHub Actions**.
