# Smart Monitor Tech - Dashboard Predictivo

Este proyecto es un MVP (Producto Mínimo Viable) de un sistema de monitorización industrial con detección de anomalías mediante IA, desarrollado para **Telefónica Tech**. La arquitectura es modular, escalable y está completamente contenedorizada.

## Tecnologías Utilizadas

- **Frontend:** React + TypeScript + Tailwind CSS.
- **Gráficas:** Recharts (Visualización de datos en tiempo real).
- **Backend:** FastAPI (Python 3.12).
- **IA/Simulación:** Endpoint de inferencia para detección de anomalías térmicas.
- **Despliegue:** Docker & Docker Compose (Entorno reproducible).

## Características Principales

1. **Monitorización Real-Time:** Conexión constante con sensores simulados.
2. **Detección de Anomalías:** La IA evalúa la telemetría y emite un veredicto (NORMAL/CRITICAL/WARNING) con un índice de confianza.
3. **Histórico Gráfico:** Visualización de tendencias térmicas mediante gráficas de área dinámicas.
4. **Tabla de Eventos:** Log detallado de los últimos registros procesados.

## Instrucciones de Ejecución

Solo necesitas tener instalado **Docker Desktop**.

1. Clona o descarga este repositorio.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Ejecuta el siguiente comando para levantar los servicios:
   ```bash
   docker compose up --build
   ```
