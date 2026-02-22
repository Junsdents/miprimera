import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Colors } from './colors';

// Nombres cortos de los días para el encabezado del calendario.
const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

// Datos simulados de cepillado por día del mes:
// 0 = incompleto, 1 = un cepillado, 2 = dos cepillados, 3 = rutina completa.
const DATOS_SIMULADOS = {
  1: 1,
  2: 2,
  3: 3,
  4: 0,
  5: 2,
  6: 3,
  7: 1,
  8: 0,
  9: 3,
  10: 2,
  11: 1,
  12: 3,
  13: 0,
  14: 2,
  15: 3,
  16: 1,
  17: 0,
  18: 3,
  19: 2,
  20: 1,
  21: 3,
  22: 0,
  23: 2,
  24: 3,
  25: 1,
  26: 0,
  27: 2,
  28: 3,
};

const CalendarioScreen = () => {
  // Mes y año de ejemplo para renderizar el calendario mensual.
  const anio = 2026;
  const mes = 1; // 1 = febrero (base 1 para lectura humana)

  // Construye la grilla mensual con espacios vacíos al inicio y final.
  const celdasCalendario = useMemo(() => {
    const primerDiaDelMes = new Date(anio, mes - 1, 1);
    const ultimoDiaDelMes = new Date(anio, mes, 0);

    // Convertimos domingo(0) a índice final para iniciar semana en lunes.
    const indiceInicio = (primerDiaDelMes.getDay() + 6) % 7;
    const totalDias = ultimoDiaDelMes.getDate();

    const celdas = [];

    // Celdas vacías antes del día 1 para alinear el mes correctamente.
    for (let i = 0; i < indiceInicio; i += 1) {
      celdas.push({ tipo: 'vacio', clave: `vacio-inicio-${i}` });
    }

    // Celdas de cada día con su estado de cepillado simulado.
    for (let dia = 1; dia <= totalDias; dia += 1) {
      celdas.push({
        tipo: 'dia',
        clave: `dia-${dia}`,
        dia,
        estrellas: DATOS_SIMULADOS[dia] ?? 0,
      });
    }

    // Completa la última fila para mantener una grilla uniforme.
    while (celdas.length % 7 !== 0) {
      celdas.push({ tipo: 'vacio', clave: `vacio-fin-${celdas.length}` });
    }

    return celdas;
  }, [anio, mes]);

  // Devuelve las estrellas según el nivel de cepillado diario.
  const renderEstrellas = (estrellas) => {
    if (estrellas === 1) return '⭐';
    if (estrellas === 2) return '⭐⭐';
    if (estrellas === 3) return '⭐⭐⭐';
    return '—';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado infantil con título del calendario del mes */}
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Calendario de Sonrisas 🦷</Text>
        <Text style={styles.subtitulo}>Febrero {anio}</Text>
      </View>

      {/* Tarjeta principal que contiene el calendario mensual */}
      <View style={styles.tarjetaCalendario}>
        {/* Encabezado de días de la semana */}
        <View style={styles.filaSemana}>
          {DIAS_SEMANA.map((diaSemana) => (
            <Text key={diaSemana} style={styles.textoDiaSemana}>
              {diaSemana}
            </Text>
          ))}
        </View>

        {/* Grilla del calendario con estrellas por día */}
        <View style={styles.grilla}>
          {celdasCalendario.map((celda) => {
            if (celda.tipo === 'vacio') {
              return <View key={celda.clave} style={[styles.celdaDia, styles.celdaVacia]} />;
            }

            const incompleto = celda.estrellas === 0;

            return (
              <View
                key={celda.clave}
                style={[styles.celdaDia, incompleto ? styles.celdaIncompleta : styles.celdaCompletada]}
              >
                <Text style={[styles.numeroDia, incompleto && styles.textoIncompleto]}>{celda.dia}</Text>
                <Text style={[styles.estrellas, incompleto && styles.textoIncompleto]}>
                  {renderEstrellas(celda.estrellas)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Leyenda para explicar el significado de las estrellas */}
      <View style={styles.leyenda}>
        <Text style={styles.itemLeyenda}>⭐ 1 cepillado</Text>
        <Text style={styles.itemLeyenda}>⭐⭐ 2 cepillados</Text>
        <Text style={styles.itemLeyenda}>⭐⭐⭐ rutina completa</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  encabezado: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 18,
    color: '#555555',
    fontWeight: '700',
  },
  tarjetaCalendario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 14,
  },
  filaSemana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textoDiaSemana: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800',
    color: '#4D4D4D',
  },
  grilla: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  celdaDia: {
    width: '13.6%',
    minHeight: 74,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  celdaVacia: {
    backgroundColor: 'transparent',
  },
  celdaCompletada: {
    backgroundColor: '#FFF6CC',
    borderWidth: 1,
    borderColor: '#FBE58B',
  },
  celdaIncompleta: {
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  numeroDia: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  estrellas: {
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
  },
  textoIncompleto: {
    color: '#9D9D9D',
  },
  leyenda: {
    marginTop: 14,
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    padding: 14,
    gap: 4,
  },
  itemLeyenda: {
    fontSize: 15,
    fontWeight: '700',
    color: '#214B33',
  },
});

export default CalendarioScreen;
