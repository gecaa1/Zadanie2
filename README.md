1. Workflow uruchamia się na każdym pushu do main. Składa się z następujących kroków:

Checkout kodu – pobiera repozytorium.
Konfiguracja środowiska – instaluje QEMU i Buildx dla multiarch.
Logowanie – uwierzytelnianie do DockerHub i GHCR.
Tagowanie – generowanie tagu opartego o SHA commita.
Budowanie i wypychanie obrazu – z użyciem platform amd64 i arm64.
Pobieranie obrazu lokalnie – docker pull, aby zapewnić działanie Trivy.
Skanowanie Trivy – wykrywa podatności typu HIGH i CRITICAL.

2. W repozytorium skonfigurowano trzy sekrety:

-GHCR_TOKEN – token personal access z uprawnieniami read:packages, write:packages
-DOCKERHUB_USER – login do DockerHuba
-DOCKERHUB_PASS – hasło lub token do DockerHuba


3. Workflow został poprawnie uruchomiony, co potwierdza jego działanie. Poniżej fragment logu Trivy:

ghcr.io/NAZWA_UZYTKOWNIKA/zadanie2:sha-4c85355 (alpine 3.22.0)
===================================================
Total: 0 (HIGH: 0, CRITICAL: 0)

Node.js (node-pkg)
==================
Total: 1 (HIGH: 1, CRITICAL: 0)

cross-spawn (package.json) – CVE-2024-21538

A. Wykryto podatność HIGH – pipeline zadziałał zgodnie z oczekiwaniami i zgłosił problem.

Podsumowując
Utworzony workflow CI/CD automatyzuje cały proces: budowa → publikacja → skanowanie.
Praca została wykonana w pełni w GitHub, z wykorzystaniem dobrych praktyk bezpieczeństwa.
Działanie zostało potwierdzone przez uruchomienie pipeline, który wykrył realną podatność CVE.
