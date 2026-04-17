"use client"

import React, { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import { 
  Home, PieChart, CreditCard, ShieldAlert, Settings, 
  Send, Bot, Target, ArrowUpRight, ArrowDownRight,
  TrendingUp, RefreshCw, Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_MESSAGES = [
  { id: 1, sender: 'agent', text: "Hey! I just analyzed your recent transactions. You've been doing great staying under your dining budget this week! 🌮" },
  { id: 2, sender: 'agent', text: "However, I noticed your Adobe Creative Cloud subscription is about to renew for $54.99. You haven't used it much recently. Want me to try downgrading or canceling it?", actionRequired: true }
];

const MOCK_CHART_DATA = [
  { name: '1st', balance: 4200, predicted: 4200 },
  { name: '5th', balance: 3800, predicted: 3800 },
  { name: '10th', balance: 3200, predicted: 3200 },
  { name: '15th', balance: 2500, predicted: 2500 },
  { name: '20th', balance: null, predicted: 2100 },
  { name: '25th', balance: null, predicted: 1800 },
  { name: '30th', balance: null, predicted: 4500 }, // Salary
];

const SUBSCRIPTIONS = [
  { id: 1, name: 'Netflix Premium', cost: '$22.99', icon: '🍿', category: 'Streaming', usage: 'High' },
  { id: 2, name: 'Adobe CC', cost: '$54.99', icon: '🎨', category: 'Productivity', usage: 'Low' },
  { id: 3, name: 'Spotify Duo', cost: '$14.99', icon: '🎧', category: 'Streaming', usage: 'High' },
];

export default function AgenticFinanceApp() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = { id: Date.now(), sender: 'user', text: inputVal };
    setMessages(prev => [...prev, newMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate Agent Response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'agent',
        text: "Got it! I am running an AI pipeline to structure this request. Since this is a demo, no real action will be taken. But the agentic capability would execute this safely now!"
      }]);
    }, 1500);
  };

  const handleAction = (msgId: number) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      text: 'Yes, please cancel it.'
    }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'agent',
        text: "Executing cancellation playbook... I've successfully navigated the Adobe cancel flow. You just saved $54.99 this month! 🎉"
      }]);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      
      {/* SIDEBAR */}
      <nav className={`${styles.sidebar} glass-panel`}>
        <div className={styles.logo}>
          <Zap size={24} />
        </div>
        <div className={`${styles.navItem} ${styles.active}`}><Home size={22} /></div>
        <div className={styles.navItem}><PieChart size={22} /></div>
        <div className={styles.navItem}><CreditCard size={22} /></div>
        <div className={styles.navItem}><ShieldAlert size={22} /></div>
        <div style={{ flex: 1 }} />
        <div className={styles.navItem}><Settings size={22} /></div>
      </nav>

      {/* MAIN VIEW */}
      <main className={styles.mainArea}>
        <header className={styles.header}>
          <div>
            <h1>Good evening, Ninja.</h1>
            <p>Your agent is actively monitoring your cash flow and subscriptions.</p>
          </div>
          <button className={`${styles.navItem}`} style={{background: 'rgba(255,255,255,0.05)'}}>
            <Bot size={22} color="var(--accent-primary)" />
          </button>
        </header>

        {/* TOP CARDS */}
        <div className={styles.cardsGrid}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`${styles.card} glass-panel`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}><ArrowUpRight size={20} /></div>
              <span style={{color: 'var(--success)', fontWeight: 600}}>+12.5%</span>
            </div>
            <div>
              <div className={styles.cardAmount}>$4,250.00</div>
              <div className={styles.cardTitle}>Available Cash Flow</div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className={`${styles.card} glass-panel`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon} style={{color: 'var(--warning)'}}><RefreshCw size={20} /></div>
              <span style={{color: 'var(--warning)', fontWeight: 600}}>Needs Review</span>
            </div>
            <div>
              <div className={styles.cardAmount}>$450.00</div>
              <div className={styles.cardTitle}>Upcoming Bills (7 Days)</div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className={`${styles.card} glass-panel`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon} style={{color: 'var(--accent-primary)'}}><Target size={20} /></div>
              <span style={{color: 'var(--text-secondary)', fontWeight: 600}}>Automated</span>
            </div>
            <div>
              <div className={styles.cardAmount}>$1,200.00</div>
              <div className={styles.cardTitle}>Safe to Autosave</div>
            </div>
          </motion.div>
        </div>

        <div className={styles.detailsSection}>
          {/* CASH FLOW CHART */}
          <div className={`${styles.chartContainer} glass-panel`}>
            <h3 style={{marginBottom: '20px', fontSize: '1.2rem'}}>30-Day Cash Flow Forecast</h3>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredict" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--text-tertiary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--text-tertiary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="none" tick={{fill: 'var(--text-secondary)', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{background: 'var(--bg-panel)', border: '1px solid var(--border-color)', borderRadius: '12px'}} 
                  itemStyle={{color: 'var(--text-primary)'}}
                />
                <Area type="monotone" dataKey="balance" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                <Area type="monotone" dataKey="predicted" stroke="var(--text-tertiary)" strokeDasharray="5 5" strokeWidth={2} fillOpacity={1} fill="url(#colorPredict)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* SUBSCRIPTION ASSISTANT */}
          <div className={`${styles.card} glass-panel`} style={{padding: '24px'}}>
            <h3 style={{marginBottom: '16px', fontSize: '1.2rem'}}>Detected Subscriptions</h3>
            <div className={styles.subList}>
              {SUBSCRIPTIONS.map(sub => (
                <div key={sub.id} className={styles.subItem}>
                  <div className={styles.subInfo}>
                    <div className={styles.subIcon}>{sub.icon}</div>
                    <div>
                      <div style={{fontWeight: 600}}>{sub.name}</div>
                      <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>{sub.category} • {sub.usage} Usage</div>
                    </div>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <div style={{fontWeight: 600, fontSize: '1.1rem'}}>{sub.cost}</div>
                    <div className={styles.subActions}>
                      <button>Negotiate / Cancel</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* AI ASSISTANT PANE */}
      <aside className={`${styles.assistantPane} glass-panel`}>
        <div className={styles.assistantHeader}>
          <div className={styles.agentAvatar}>
            <div className={styles.pulse} />
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={20} color="white" />
            </div>
          </div>
          <div>
            <div style={{fontWeight: 600, fontSize: '1.1rem'}}>Copilot AI</div>
            <div style={{fontSize: '0.8rem', color: 'var(--success)'}}>● Online & Monitoring</div>
          </div>
        </div>

        <div className={styles.chatArea}>
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`${styles.message} ${styles[msg.sender]}`}
              >
                {msg.text}
                {msg.actionRequired && msg.sender === 'agent' && (
                  <button onClick={() => handleAction(msg.id)} className={styles.actionButton}>
                    Yes, Cancel It
                  </button>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${styles.message} ${styles.agent}`}>
                <div className={styles.typingIndicator}>
                  <div className={styles.typingDot} />
                  <div className={styles.typingDot} />
                  <div className={styles.typingDot} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <input 
              type="text" 
              placeholder="Ask Copilot anything..." 
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
            />
            <button type="submit" className={styles.sendButton} disabled={!inputVal.trim() && !isTyping}>
              <Send size={18} />
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
