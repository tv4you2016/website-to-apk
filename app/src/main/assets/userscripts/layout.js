// ==UserScript==
// @name        VM: Indicador + Ocultar Elementos
// @namespace   Violentmonkey Scripts
// @match       *://iotmediasoup.ddns.net/*
// @grant       none
// @version     1.0
// @author      [PT]GOODVIBE[PT]
// @description Mostra o roomId e oculta elementos específicos dinamicamente
// ==/UserScript==


(function () {
  'use strict';

  console.log('[VM] Script iniciado...');

  // ========== MOSTRAR INDICADOR COM ROOM ID ==========
  const roomId = new URL(window.location.href).searchParams.get('roomId') || 'desconhecido';

  if (!document.getElementById('vm-room-indicator')) {
    const badge = document.createElement('div');
    badge.id = 'vm-room-indicator';
    badge.innerHTML = `
      🔌 <strong>Script ativo</strong><br>
      🏷️ Sala: <code>${roomId}</code>
    `;
    Object.assign(badge.style, {
      position: 'fixed',
      top: '12px',
      right: '12px',
      background: '#007bff',
      color: '#fff',
      padding: '10px 14px',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'sans-serif',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      zIndex: 99999,
      cursor: 'pointer'
    });
    badge.title = 'Clique para remover o indicador';
    badge.addEventListener('click', () => {
      badge.remove();
      console.log('[VM] Indicador removido.');
    });
    document.body.appendChild(badge);
  }

  // ========== FUNÇÃO GENÉRICA PARA ESCONDER OU REMOVER ELEMENTOS ==========
  function handleElement(selector, action = 'hide') {
    const el = document.querySelector(selector);
    if (el) {
      if (action === 'remove') {
        el.remove();
        console.log(`[VM] Elemento removido: ${selector}`);
      } else {
        el.style.display = 'none';
        console.log(`[VM] Elemento escondido: ${selector}`);
      }
      return true;
    }
    return false;
  }

  function waitForElement(selector, action = 'hide') {
    if (!handleElement(selector, action)) {
      const observer = new MutationObserver(() => {
        if (handleElement(selector, action)) {
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      console.log(`[VM] Aguardando aparecer: ${selector}`);
    }
  }



  // ========== LISTA DE ELEMENTOS A ESCONDER OU REMOVER ==========
  waitForElement('.room-link', 'hide'); // esconder
  waitForElement('#mediasoup-demo-app-container > div > div.info > p:nth-child(1)', 'hide'); // esconder
  waitForElement('#mediasoup-demo-app-container > div > div.info > p:nth-child(2)', 'hide'); // esconder
  waitForElement('#mediasoup-demo-app-container > div > div.info > p:nth-child(3)', 'hide'); // esconder


  waitForElement('.controls', 'hide'); // esconder

  waitForElement('.room-link', 'hide'); // esconder
  waitForElement('#mediasoup-demo-app-container > div > div.me-container > div > div:nth-child(1) > div.info > div.peer.is-me > span', 'remove'); // remover


 //waitForElement('#mediasoup-demo-app-container > div > div.me-container> div > div.controls', 'remove'); // remover Controls  Step1
  //waitForElement('#mediasoup-demo-app-container > div > div.me-container.active-speaker > div > div.controls', 'remove'); // remover Controls // remover Controls  Step2


  waitForElement('#mediasoup-demo-app-container > div > div.me-container > div > div:nth-child(1) > div.info', 'remove'); // remover info

  waitForElement('#mediasoup-demo-app-container > div > div.chat-input-container', 'remove'); // remover chat
  waitForElement('#mediasoup-demo-app-container > div > div:nth-child(1)', 'remove'); // remover  Notifications
  waitForElement('#mediasoup-demo-app-container > div > div.room-link-wrapper', 'remove'); // remover  invitation link
  waitForElement('#mediasoup-demo-app-container > div > div.sidebar', 'remove'); // remover  sidebar
  waitForElement('#mediasoup-demo-app-container > div > div:nth-child(5)', 'remove'); // remover  Stats
  waitForElement('#mediasoup-demo-app-container > div > div.__react_component_tooltip.place-top.type-dark.allow_hover', 'remove'); // remover  Stats

  waitForElement('[data-id="tooltip"]', 'remove'); // <- aqui está o novo
  waitForElement('#mediasoup-demo-app-container > div > div:nth-child(3) > div > div > div:nth-child(2) > div.info','hide'  );
})();
